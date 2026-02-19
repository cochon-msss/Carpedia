$(() => {
  let selectedCar = null;
  let manufacturersLoaded = false;
  let currentGenerationSeq = null;
  let currentCarName = null;

  // ===== 차량 선택 =====
  $(document).on("click", "#btn-select-car", function () {
    openModal();
  });

  $(document).on("click", "#btn-change-car", function () {
    if (selectedCar && selectedCar.generationSeq) {
      loadManufacturers();
      loadTrimList(selectedCar.generationSeq, selectedCar.carName);
      $("#car-select-modal").removeClass("hidden");
    } else {
      openModal();
    }
  });

  function loadManufacturers() {
    if (!manufacturersLoaded) {
      const grid = $("#modal-step-1 .modal-card-grid");
      $.get("/carCompare/manufacturers", function (data) {
        data.forEach(function (m) {
          grid.append(
            '<div class="select-card" data-seq="' + m.manufacturerSeq + '">' +
              '<span class="card-name">' + m.manufacturerName + '</span>' +
              '<span class="card-sub">' + m.foundedYear + '년 설립</span>' +
            '</div>'
          );
        });
        manufacturersLoaded = true;
      });
    }
  }

  function openModal() {
    loadManufacturers();
    showModalStep(1);
    $("#car-select-modal").removeClass("hidden");
  }

  function loadTrimList(generationSeq, carName) {
    currentGenerationSeq = generationSeq;
    currentCarName = carName;

    const list = $(".modal-trim-list");
    list.empty();

    $.get("/carCompare/trims", { generationSeq: generationSeq }, function (data) {
      data.forEach(function (trim) {
        list.append(
          '<div class="trim-item" data-seq="' + trim.trimSeq + '" data-car-name="' + carName + '" data-trim-name="' + trim.trimName + '">' +
            '<span class="trim-name">' + trim.trimName + '</span>' +
            '<span class="trim-select-arrow">&rsaquo;</span>' +
          '</div>'
        );
      });
      showModalStep(4);
    });
  }

  // 모달 닫기
  $(document).on("click", ".modal-close", function () {
    $("#car-select-modal").addClass("hidden");
  });

  $(document).on("click", ".modal-overlay", function (e) {
    if ($(e.target).hasClass("modal-overlay")) {
      $("#car-select-modal").addClass("hidden");
    }
  });

  // 단계 이동
  function showModalStep(step) {
    $(".modal-step-content").addClass("hidden");
    $("#modal-step-" + step).removeClass("hidden");
    $(".modal-step").removeClass("active");
    $(".modal-step[data-step='" + step + "']").addClass("active");
  }

  $(document).on("click", ".modal-back", function () {
    showModalStep($(this).data("target"));
  });

  $(document).on("click", ".btn-other-car", function () {
    showModalStep(1);
  });

  // Step 1: 제조사 선택
  $(document).on("click", "#modal-step-1 .select-card", function () {
    const seq = $(this).data("seq");
    $("#modal-step-1 .select-card").removeClass("active");
    $(this).addClass("active");

    const grid = $("#modal-step-2 .modal-card-grid");
    grid.empty();

    $.get("/model/" + seq, function (data) {
      data.forEach(function (model) {
        grid.append(
          '<div class="select-card" data-seq="' + model.modelSeq + '" data-name="' + model.modelName + '">' +
            '<span class="card-badge">' + model.bodyType + '</span>' +
            '<span class="card-name">' + model.modelName + '</span>' +
            '<span class="card-sub">' + model.segment + '</span>' +
          '</div>'
        );
      });
      showModalStep(2);
    });
  });

  // Step 2: 모델 선택
  $(document).on("click", "#modal-step-2 .select-card", function () {
    const seq = $(this).data("seq");
    const modelName = $(this).data("name");
    $("#modal-step-2 .select-card").removeClass("active");
    $(this).addClass("active");

    const grid = $("#modal-step-3 .modal-card-grid");
    grid.empty();

    $.get("/generation/" + seq, function (data) {
      data.forEach(function (gen) {
        const tagClass = gen.discontinuedFlag === "Y" ? "discontinued" : "current";
        const tagText = gen.discontinuedFlag === "Y" ? "단종" : "현재 판매";
        const period = gen.releaseDate + " ~ " + (gen.discontinuedFlag === "Y" ? gen.discontinuedDate : "현재");

        grid.append(
          '<div class="select-card" data-seq="' + gen.generationSeq + '" data-name="' + modelName + " " + gen.generationName + '">' +
            '<div class="card-top">' +
              '<span class="card-name">' + gen.generationName + '</span>' +
              '<span class="card-tag ' + tagClass + '">' + tagText + '</span>' +
            '</div>' +
            '<span class="card-sub">' + period + '</span>' +
          '</div>'
        );
      });
      showModalStep(3);
    });
  });

  // Step 3: 세대 선택
  $(document).on("click", "#modal-step-3 .select-card", function () {
    const seq = $(this).data("seq");
    const carName = $(this).data("name");
    $("#modal-step-3 .select-card").removeClass("active");
    $(this).addClass("active");

    loadTrimList(seq, carName);
  });

  // Step 4: 트림 선택 (최종)
  $(document).on("click", ".trim-item", function () {
    const trimSeq = $(this).data("seq");
    const carName = $(this).data("car-name");
    const trimName = $(this).data("trim-name");

    $.get("/carCompare/spec", { trimSeq: trimSeq }, function (spec) {
      selectedCar = {
        trimSeq: trimSeq,
        spec: spec,
        carName: carName,
        trimName: trimName,
        generationSeq: currentGenerationSeq
      };

      applyCarSelection();
      $("#car-select-modal").addClass("hidden");
    });
  });

  // ===== 차량 선택 완료 처리 =====
  function applyCarSelection() {
    const spec = selectedCar.spec;

    // 슬롯 UI 전환
    $("#slot-empty").addClass("hidden");
    $("#slot-selected").removeClass("hidden");
    $("#selected-car-name").text(selectedCar.carName);
    $("#selected-trim-name").text(selectedCar.trimName);

    // 자동 추출 값 표시
    $("#spec-fuel-type").text(spec.fuelType || "-");
    $("#spec-fuel-efficiency").text(spec.fuelEfficiency ? spec.fuelEfficiency + " km/L" : "-");
    $("#spec-displacement").text(spec.displacement ? spec.displacement + " cc" : "-");

    // 연료타입에 따른 유가 기본값 세팅
    const fuelType = spec.fuelType || "";
    let defaultPrice = 1650;
    if (fuelType.indexOf("경유") !== -1 || fuelType.indexOf("디젤") !== -1) {
      defaultPrice = 1450;
    } else if (fuelType.indexOf("LPG") !== -1) {
      defaultPrice = 950;
    } else if (fuelType.indexOf("전기") !== -1) {
      defaultPrice = 0;
    }
    $("#fuel-price").val(defaultPrice);

    // 입력 폼 표시
    $("#calc-form").removeClass("hidden");
    // 이전 결과 숨김
    $("#calc-result").addClass("hidden");
  }

  // ===== 계산 로직 =====
  $(document).on("click", "#btn-calculate", function () {
    if (!selectedCar) return;

    const spec = selectedCar.spec;
    const annualDistance = parseInt($("#annual-distance").val()) || 0;
    const fuelPrice = parseInt($("#fuel-price").val()) || 0;
    const insuranceCost = parseInt($("#insurance-cost").val()) || 0;
    const maintenanceCost = parseInt($("#maintenance-cost").val()) || 0;
    const otherCost = parseInt($("#other-cost").val()) || 0;

    // 1. 연료비
    const fuelEfficiency = parseFloat(spec.fuelEfficiency) || 0;
    let fuelCost = 0;
    if (fuelEfficiency > 0 && fuelPrice > 0) {
      fuelCost = Math.round(annualDistance / fuelEfficiency * fuelPrice);
    }

    // 2. 자동차세
    const fuelType = spec.fuelType || "";
    const displacement = parseInt(spec.displacement) || 0;
    let carTax = 0;

    if (fuelType.indexOf("전기") !== -1) {
      // 전기차 고정 세액
      carTax = 100000;
    } else if (displacement > 0) {
      // 배기량 기반 세금
      if (displacement <= 1000) {
        carTax = displacement * 80;
      } else if (displacement <= 1600) {
        carTax = displacement * 140;
      } else {
        carTax = displacement * 200;
      }
    }
    // 지방교육세 30% 추가
    carTax = Math.round(carTax * 1.3);

    // 3~5. 사용자 입력 항목
    // (insuranceCost, maintenanceCost, otherCost 그대로 사용)

    // 합계
    const annualTotal = fuelCost + carTax + insuranceCost + maintenanceCost + otherCost;
    const monthlyTotal = Math.round(annualTotal / 12);

    // 결과 표시
    $("#result-fuel").text(formatWon(fuelCost));
    $("#result-tax").text(formatWon(carTax));
    $("#result-insurance").text(formatWon(insuranceCost));
    $("#result-maintenance").text(formatWon(maintenanceCost));
    $("#result-other").text(formatWon(otherCost));
    $("#result-annual-total").text(formatWon(annualTotal));
    $("#result-monthly-total").text(formatWon(monthlyTotal));

    $("#calc-result").removeClass("hidden");
  });

  // 원화 포맷
  function formatWon(amount) {
    return amount.toLocaleString("ko-KR") + "원";
  }
});
