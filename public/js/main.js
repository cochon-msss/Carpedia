$(() => {
  function updateDropdownWidth() {
    $(".custom-dropdown").each(function () {
      let dropdownWidth = $(this).outerWidth(); // 클릭된 요소의 너비 가져오기
      $(this)
        .find(".dropdown-list")
        .css("width", dropdownWidth + "px");
    });
  }

  $(".car-search").on("click", function () {
    // 검색
    let generationSeq = $("#generation-dropdown")
      .children(".selected")
      .attr("data-seq");
    window.location.href = `/carInfo?generationSeq=` + generationSeq;
  });

  $(".custom-dropdown").click(function (event) {
    event.stopPropagation();
    $(".custom-dropdown").not(this).removeClass("open");
    $(this).toggleClass("open");
    updateDropdownWidth(); // 너비 업데이트

    let dropdownList = $(this).find(".dropdown-list");

    if ($(this).hasClass("open")) {
      dropdownList.addClass("open");
    } else {
      dropdownList.removeClass("open");
    }
  });

  $(".dropdown-list").on("click", "li", function (event) {
    event.stopPropagation();
    let selectedText = $(this).text().trim();
    let selectedSeq = $(this).attr("data-seq");
    let custom_dropdown = $(this).closest(".custom-dropdown");
    custom_dropdown.find(".selected").text(selectedText);
    custom_dropdown.find(".selected").attr("data-seq", selectedSeq);
    custom_dropdown.removeClass("open");
    $(this).closest(".dropdown-list").removeClass("open");

    let thisId = custom_dropdown.attr("id");
    switch (thisId) {
      case "brand-dropdown": // 제조사
        $("#model-dropdown")
          .addClass("open")
          .find(".dropdown-list")
          .addClass("open");
        let manufacturerSeq = $(this).attr("data-seq");
        let modelDropdown = $("#model-dropdown").find(".dropdown-list");
        $.ajax({
          // 제조사 클릭 시 해당 제조사 모델 정보 조회
          url: "/model/" + manufacturerSeq,
          method: "GET",
          beforeSend: function () {
            modelDropdown.empty(); // 모델 정보 비워준다.
            $("#model-dropdown")
              .parents(".select-group")
              .removeClass("is_disabled");
          },
          success: function (data) {
            let modelData = data;
            let modelHtml = "";
            modelData.forEach((model) => {
              modelHtml += `<li data-seq="${model.modelSeq}">${model.modelName}</li>`;
            });
            modelDropdown.append(modelHtml);
          },
        });
        break;
      case "model-dropdown": // 모델
        $("#generation-dropdown")
          .addClass("open")
          .find(".dropdown-list")
          .addClass("open");
        let modelSeq = $(this).attr("data-seq");
        let generationDropdown = $("#generation-dropdown").find(
          ".dropdown-list"
        );
        $.ajax({
          // 모델 클릭 시 해당 모델 상세 정보 조회
          url: "/generation/" + modelSeq,
          method: "",
          beforeSend: function () {
            generationDropdown.empty(); // 세부모델 비워준다.
            $("#generation-dropdown")
              .parents(".select-group")
              .removeClass("is_disabled");
          },
          success: function (data) {
            let generationData = data;
            let generationHtml = "";
            generationData.forEach((generation) => {
              generationHtml += `<li data-seq="${generation.generationSeq}">${generation.generationName}</li>`;
            });
            generationDropdown.append(generationHtml);
          },
        });
        break;
      case "generation-dropdown": // 상세
        break;
    }
  });

  $(document).click(function () {
    $(".custom-dropdown").removeClass("open");
    $(".dropdown-list").removeClass("open");
  });

  // 창 크기 변경 시 다시 계산
  $(window).resize(updateDropdownWidth);

  // 페이지 로드 시 한 번 실행
  updateDropdownWidth();
});
