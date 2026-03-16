$(() => {
  // 숫자 포맷 (1999 → 1,999), 숫자가 아니면 원본 반환
  function fmt(v) {
    if (v == null) return "-";
    var n = Number(v);
    return isNaN(n) ? v : n.toLocaleString("ko-KR");
  }

  // 필터 버튼 토글
  $(".filter-buttons").on("click", ".filter-btn", function () {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
  });

  // 검색 실행
  $("#btn-search").on("click", fetchRecommendList);

  // 첫 로드 시 자동 조회
  fetchRecommendList();

  function fetchRecommendList() {
    const bodyType = $("#filter-body-type .filter-btn.active").data("value");
    const fuelType = $("#filter-fuel-type .filter-btn.active").data("value");
    const sortBy = $("#filter-sort-by .filter-btn.active").data("value");
    const drivetrain = $("#filter-drivetrain .filter-btn.active").data("value");

    $.get("/carRecommend/list", {
      bodyType, fuelType, sortBy, drivetrain
    }, function (data) {
      renderResults(data, sortBy);
    }).fail(function () {
      showToast("조회 중 오류가 발생했습니다");
    });
  }

  // 우선순위에 따라 하이라이트할 스펙 결정
  const sortLabelMap = {
    efficiency: { key: "fuelEfficiency", label: "연비", format: v => v || "-" },
    power: { key: "maxPower", label: "출력", format: v => v ? fmt(v) + " 마력" : "-" },
    torque: { key: "maxTorque", label: "토크", format: v => v ? fmt(v) + " kg·m" : "-" },
    lightweight: { key: "curbWeight", label: "중량", format: v => v ? fmt(v) + " kg" : "-" },
    displacement: { key: "displacement", label: "배기량", format: v => v ? fmt(v) + " cc" : "-" },
  };

  function renderResults(list, sortBy) {
    const grid = $("#result-grid");
    const empty = $("#result-empty");
    const count = $("#result-count");
    grid.empty();

    if (!list || list.length === 0) {
      empty.removeClass("hidden");
      count.text("");
      return;
    }

    empty.addClass("hidden");
    count.text("총 " + list.length + "대");

    const highlight = sortLabelMap[sortBy] || sortLabelMap.efficiency;

    list.forEach(function (car, index) {
      const highlightValue = highlight.format(car[highlight.key]);
      const rankClass = index < 3 ? " rank-top" : "";

      const card = `
        <div class="recommend-card${rankClass}">
          <div class="card-rank">${index + 1}</div>
          <div class="card-info">
            <span class="card-manufacturer">${car.manufacturerName}</span>
            <span class="card-model">${car.modelName} ${car.generationName}</span>
            <span class="card-trim">${car.trimName}</span>
          </div>
          <div class="card-specs">
            <div class="spec-badge">
              <span class="spec-label">연비</span>
              <span class="spec-value">${car.fuelEfficiency || '-'}</span>
            </div>
            <div class="spec-badge">
              <span class="spec-label">출력</span>
              <span class="spec-value">${car.maxPower ? fmt(car.maxPower) + ' 마력' : '-'}</span>
            </div>
            <div class="spec-badge">
              <span class="spec-label">연료</span>
              <span class="spec-value">${car.fuelType || '-'}</span>
            </div>
            <div class="spec-badge">
              <span class="spec-label">구동</span>
              <span class="spec-value">${car.drivetrain || '-'}</span>
            </div>
          </div>
          <div class="card-highlight">
            <span class="highlight-label">${highlight.label}</span>
            <span class="highlight-value">${highlightValue}</span>
          </div>
        </div>
      `;
      grid.append(card);
    });
  }
});
