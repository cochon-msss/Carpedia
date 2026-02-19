$(() => {
  let currentSlot = null;
  const selectedCars = [null, null];
  let manufacturersLoaded = false;
  let currentGenerationSeq = null;
  let currentCarName = null;

  // 신규 선택
  $(document).on("click", ".btn-select-car", function () {
    currentSlot = $(this).data("slot");
    openModal();
  });

  // 변경 — 이미 선택된 차량이면 트림 목록부터 표시
  $(document).on("click", ".btn-change-car", function () {
    currentSlot = $(this).data("slot");
    const car = selectedCars[currentSlot];

    if (car && car.generationSeq) {
      loadManufacturers();
      loadTrimList(car.generationSeq, car.carName);
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

  // 트림 목록 로드 후 Step 4로 이동
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

  // 뒤로 가기
  $(document).on("click", ".modal-back", function () {
    showModalStep($(this).data("target"));
  });

  // 다른 차량 선택 (Step 4에서 Step 1로)
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
      selectedCars[currentSlot] = {
        trimSeq: trimSeq,
        spec: spec,
        carName: carName,
        trimName: trimName,
        generationSeq: currentGenerationSeq
      };
      updateSlotDisplay(currentSlot);
      $("#car-select-modal").addClass("hidden");

      if (selectedCars[0] && selectedCars[1]) {
        renderComparison();
      }
    });
  });

  // 슬롯 표시 업데이트
  function updateSlotDisplay(slot) {
    const slotEl = $(".compare-slot[data-slot='" + slot + "']");
    slotEl.find(".slot-empty").addClass("hidden");
    slotEl.find(".slot-selected").removeClass("hidden");
    slotEl.find(".selected-car-name").text(selectedCars[slot].carName);
    slotEl.find(".selected-trim-name").text(selectedCars[slot].trimName);

    // 3D 뷰어 라벨 업데이트
    $("#viewer-" + slot + " .car-label").text(selectedCars[slot].carName);
    $("#model-viewers").removeClass("hidden");

    // 한쪽만 선택된 경우에도 해당 슬롯의 제원 표시
    fillSpecData(slot);
    $("#specs-container").removeClass("hidden");
  }

  // 제원 데이터 채우기
  function fillSpecData(slot) {
    const spec = selectedCars[slot].spec;
    const container = $("#specs-" + slot);

    container.find("td[data-field]").each(function () {
      const field = $(this).data("field");
      const val = spec[field];
      $(this).text(val != null ? val : "-");
    });
  }

  // 비교 렌더링
  function renderComparison() {
    [0, 1].forEach(function (slot) {
      fillSpecData(slot);
    });
    $("#specs-container").removeClass("hidden");
  }
});
