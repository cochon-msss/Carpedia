$(() => {
  const unitMap = {
    efficiency: { label: "연비", key: "fuelEfficiency", unit: "km/L" },
    power: { label: "출력", key: "maxPower", unit: "마력" },
    torque: { label: "토크", key: "maxTorque", unit: "kg·m" },
    lightweight: { label: "중량", key: "curbWeight", unit: "kg" },
    displacement: { label: "배기량", key: "displacement", unit: "cc" },
  };

  // 카테고리 탭 클릭
  $(".category-tab").on("click", function () {
    $(".category-tab").removeClass("active");
    $(this).addClass("active");
    fetchRankingList($(this).data("category"));
  });

  // 첫 로드 시 기본 카테고리(연비) 조회
  fetchRankingList("efficiency");

  function fetchRankingList(category) {
    $.get("/specRanking/list", { category }, function (data) {
      renderRanking(data, category);
    }).fail(function () {
      showToast("조회 중 오류가 발생했습니다");
    });
  }

  function renderRanking(list, category) {
    const container = $("#ranking-list");
    const empty = $("#ranking-empty");
    container.empty();

    if (!list || list.length === 0) {
      empty.removeClass("hidden");
      return;
    }

    empty.addClass("hidden");

    const info = unitMap[category] || unitMap.efficiency;

    list.forEach(function (car, index) {
      const value = car[info.key];
      const displayValue = value ? value + " " + info.unit : "-";
      const rankClass = index < 3 ? "rank-top" : "";

      const item = `
        <div class="ranking-item ${rankClass}">
          <div class="ranking-number">${index + 1}</div>
          <div class="ranking-info">
            <span class="ranking-manufacturer">${car.manufacturerName}</span>
            <span class="ranking-model">${car.modelName} ${car.generationName}</span>
            <span class="ranking-trim">${car.trimName}</span>
          </div>
          <div class="ranking-badges">
            <div class="spec-badge type-badge">
              <span class="spec-value">${car.bodyType || '-'}</span>
            </div>
            <div class="spec-badge fuel-badge">
              <span class="spec-value">${car.fuelType || '-'}</span>
            </div>
          </div>
          <div class="ranking-value">
            <span class="value-label">${info.label}</span>
            <span class="value-number">${displayValue}</span>
          </div>
        </div>
      `;
      container.append(item);
    });
  }
});
