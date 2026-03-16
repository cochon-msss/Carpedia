$(() => {
  function fmt(v) {
    if (v == null) return "-";
    var n = Number(v);
    return isNaN(n) ? v : n.toLocaleString("ko-KR");
  }

  let currentSlot = null;
  const selectedCars = [null, null];
  let manufacturersLoaded = false;
  let currentGenerationSeq = null;
  let currentCarName = null;
  let currentBodyType = null;

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
      const container = $("#modal-step-1 .modal-card-grid");
      $.get("/carCompare/manufacturers", function (data) {
        var domestic = data.filter(function (m) { return m.countryCode === "KR"; });
        var foreign = data.filter(function (m) { return m.countryCode !== "KR"; });

        function renderCards(list) {
          list.forEach(function (m) {
            container.append(
              '<div class="select-card" data-seq="' + m.manufacturerSeq + '">' +
                '<span class="card-name">' + m.manufacturerName + '</span>' +
                '<span class="card-sub">' + m.foundedYear + '년 설립</span>' +
              '</div>'
            );
          });
        }

        container.append('<div class="section-title">국내 브랜드</div>');
        renderCards(domestic);
        container.append('<div class="section-title">해외 브랜드</div>');
        renderCards(foreign);

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
          '<div class="select-card" data-seq="' + model.modelSeq + '" data-name="' + model.modelName + '" data-body-type="' + model.bodyType + '">' +
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
    currentBodyType = $(this).data("body-type");
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
        generationSeq: currentGenerationSeq,
        bodyType: currentBodyType
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

    // 제원 데이터 미리 채워두기 (표시는 둘 다 선택 시)
    fillSpecData(slot);
  }

  // 제원 데이터 채우기
  function fillSpecData(slot) {
    const spec = selectedCars[slot].spec;
    const container = $("#specs-" + slot);

    container.find("td[data-field]").each(function () {
      const field = $(this).data("field");
      const val = spec[field];
      $(this).text(val != null ? fmt(val) : "-");
    });
  }

  // 비교 렌더링
  function renderComparison() {
    [0, 1].forEach(function (slot) {
      fillSpecData(slot);
    });
    $("#specs-container").removeClass("hidden");
    renderRadarChart();
  }

  // Chart.js 레이더 차트
  var radarChart = null;

  function renderRadarChart() {
    var a = selectedCars[0].spec;
    var b = selectedCars[1].spec;

    var axes = [
      { label: "출력", valA: parseFloat(a.maxPower), valB: parseFloat(b.maxPower) },
      { label: "토크", valA: parseFloat(a.maxTorque), valB: parseFloat(b.maxTorque) },
      { label: "연비", valA: parseFloat(a.fuelEfficiency), valB: parseFloat(b.fuelEfficiency) },
      { label: "배기량", valA: parseFloat(a.displacement), valB: parseFloat(b.displacement) },
      { label: "중량", valA: parseFloat(a.curbWeight), valB: parseFloat(b.curbWeight) }
    ];

    axes.forEach(function (ax) {
      if (isNaN(ax.valA)) ax.valA = 0;
      if (isNaN(ax.valB)) ax.valB = 0;
    });

    var hasData = axes.some(function (ax) { return ax.valA > 0 || ax.valB > 0; });
    if (!hasData) {
      $("#radar-section").addClass("hidden");
      return;
    }

    // 각 축 정규화 (두 값 중 큰 값 = 100)
    var dataA = [], dataB = [];
    axes.forEach(function (ax) {
      var maxV = Math.max(ax.valA, ax.valB);
      if (maxV === 0) {
        dataA.push(0);
        dataB.push(0);
      } else {
        dataA.push(Math.round((ax.valA / maxV) * 100));
        dataB.push(Math.round((ax.valB / maxV) * 100));
      }
    });

    var labels = axes.map(function (ax) { return ax.label; });

    // 기존 차트 파괴
    if (radarChart) {
      radarChart.destroy();
    }

    var ctx = document.getElementById("radar-canvas").getContext("2d");

    var style = getComputedStyle(document.documentElement);
    var textColor = style.getPropertyValue("--text-secondary").trim() || "#94a3b8";
    var gridColor = style.getPropertyValue("--border").trim() || "#e2e8f0";

    radarChart = new Chart(ctx, {
      type: "radar",
      data: {
        labels: labels,
        datasets: [
          {
            label: selectedCars[0].carName,
            data: dataA,
            backgroundColor: "rgba(99, 102, 241, 0.15)",
            borderColor: "rgba(99, 102, 241, 1)",
            borderWidth: 2.5,
            pointBackgroundColor: "rgba(99, 102, 241, 1)",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7
          },
          {
            label: selectedCars[1].carName,
            data: dataB,
            backgroundColor: "rgba(245, 158, 11, 0.12)",
            borderColor: "rgba(245, 158, 11, 1)",
            borderWidth: 2.5,
            pointBackgroundColor: "rgba(245, 158, 11, 1)",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: textColor,
              font: { size: 13, weight: "600", family: "Pretendard" },
              padding: 20,
              usePointStyle: true,
              pointStyle: "rectRounded"
            }
          },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                var i = ctx.dataIndex;
                var ax = axes[i];
                var val = ctx.datasetIndex === 0 ? ax.valA : ax.valB;
                return ctx.dataset.label + ": " + fmt(val);
              }
            }
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              display: false,
              stepSize: 25
            },
            grid: {
              color: gridColor,
              lineWidth: 1
            },
            angleLines: {
              color: gridColor,
              lineWidth: 1
            },
            pointLabels: {
              color: textColor,
              font: { size: 14, weight: "700", family: "Pretendard" },
              padding: 16
            }
          }
        },
        animation: {
          duration: 800,
          easing: "easeOutQuart"
        }
      }
    });

    $("#radar-section").removeClass("hidden");
  }
});
