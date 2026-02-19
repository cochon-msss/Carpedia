$(() => {
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

    $.get("/carRecommend/list", { bodyType, fuelType, sortBy }, function (data) {
      renderResults(data);
    }).fail(function () {
      showToast("조회 중 오류가 발생했습니다");
    });
  }

  function renderResults(list) {
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

    list.forEach(function (car, index) {
      const card = `
        <div class="recommend-card">
          <div class="card-rank">${index + 1}</div>
          <div class="card-info">
            <span class="card-manufacturer">${car.manufacturerName}</span>
            <span class="card-model">${car.modelName} ${car.generationName}</span>
            <span class="card-trim">${car.trimName}</span>
          </div>
          <div class="card-specs">
            <div class="spec-badge">
              <span class="spec-label">연비</span>
              <span class="spec-value">${car.fuelEfficiency ? car.fuelEfficiency + ' km/L' : '-'}</span>
            </div>
            <div class="spec-badge">
              <span class="spec-label">출력</span>
              <span class="spec-value">${car.maxPower ? car.maxPower + ' 마력' : '-'}</span>
            </div>
            <div class="spec-badge">
              <span class="spec-label">중량</span>
              <span class="spec-value">${car.curbWeight ? car.curbWeight + ' kg' : '-'}</span>
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
        </div>
      `;
      grid.append(card);
    });
  }
});
