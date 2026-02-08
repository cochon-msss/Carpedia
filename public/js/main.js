$(() => {
  // Step 1: 제조사 클릭
  $(".manufacturer-card").on("click", function () {
    const manufacturerSeq = $(this).data("seq");

    $(".manufacturer-card").removeClass("active");
    $(this).addClass("active");

    $.ajax({
      url: "/model/" + manufacturerSeq,
      method: "GET",
      success: function (data) {
        const modelGrid = $(".model-grid");
        modelGrid.empty();

        data.forEach((model) => {
          modelGrid.append(`
            <div class="select-card model-card" data-seq="${model.modelSeq}">
              <span class="card-badge">${model.bodyType}</span>
              <span class="card-name">${model.modelName}</span>
              <span class="card-sub">${model.segment}</span>
            </div>
          `);
        });

        $("#step-model").removeClass("hidden");
        $("#step-generation").addClass("hidden");

        // 스크롤 이동
        $("#step-model")[0].scrollIntoView({ behavior: "smooth", block: "start" });
      },
    });
  });

  // Step 2: 모델 클릭
  $(document).on("click", ".model-card", function () {
    const modelSeq = $(this).data("seq");

    $(".model-card").removeClass("active");
    $(this).addClass("active");

    $.ajax({
      url: "/generation/" + modelSeq,
      method: "GET",
      success: function (data) {
        const genGrid = $(".generation-grid");
        genGrid.empty();

        data.forEach((gen) => {
          const status = gen.discontinuedFlag === "Y"
            ? `<span class="card-tag discontinued">단종</span>`
            : `<span class="card-tag current">현재 판매</span>`;

          const period = gen.discontinuedFlag === "Y"
            ? `${gen.releaseDate} ~ ${gen.discontinuedDate}`
            : `${gen.releaseDate} ~ 현재`;

          genGrid.append(`
            <div class="select-card generation-card" data-seq="${gen.generationSeq}">
              <div class="card-top">
                <span class="card-name">${gen.generationName}</span>
                ${status}
              </div>
              <span class="card-sub">${period}</span>
            </div>
          `);
        });

        $("#step-generation").removeClass("hidden");
        $("#step-generation")[0].scrollIntoView({ behavior: "smooth", block: "start" });
      },
    });
  });

  // Step 3: 세대 클릭 → carInfo 페이지로 이동
  $(document).on("click", ".generation-card", function () {
    const generationSeq = $(this).data("seq");
    window.location.href = "/carInfo?generationSeq=" + generationSeq;
  });

  // 뒤로가기 버튼
  $(document).on("click", ".step-back", function () {
    const targetId = $(this).data("target");
    $(this).closest(".browse-step").addClass("hidden");
    $("#" + targetId)[0].scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
