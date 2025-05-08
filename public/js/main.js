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
    window.location.href = `/carInfo`;
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
    let custom_dropdown = $(this).closest(".custom-dropdown");
    custom_dropdown.find(".selected").text(selectedText);
    custom_dropdown.removeClass("open");
    $(this).closest(".dropdown-list").removeClass("open");

    let thisId = custom_dropdown.attr("id");
    switch (thisId) {
      case "brand-dropdown": // 제조사
        $("#model-dropdown")
          .addClass("open")
          .find(".dropdown-list")
          .addClass("open");
        let manufacturerSeq = $(this).attr("data-id");
        let modelDropdown = $("#model-dropdown").find(".dropdown-list");
        $.ajax({
          url: "/model/" + manufacturerSeq,
          method: "GET",
          beforeSend: function () {
            modelDropdown.empty(); // 모델 정보 비워준다.
          },
          success: function (data) {
            let modelData = data;
            let modelHtml = "";
            modelData.forEach((model) => {
              modelHtml += `<li data-id="${model.modelSeq}">${model.modelName}</li>`;
            });
            modelDropdown.append(modelHtml);
          },
        });
        break;
      case "model-dropdown": // 모델
        $("#trim-dropdown")
          .addClass("open")
          .find(".dropdown-list")
          .addClass("open");
        let modelSeq = $(this).attr("data-id");
        let trimDropdown = $("#trim-dropdown").find(".dropdown-list");
        $.ajax({
          url: "/trim/" + modelSeq,
          method: "",
          beforeSend: function () {
            trimDropdown.empty(); // 세부모델 비워준다.
          },
          success: function (data) {
            let trimData = data;
            let trimHtml = "";
            trimData.forEach((trim) => {
              trimHtml += `<li data-id="${trim.trimSeq}">${trim.trimName}</li>`;
            });
            trimDropdown.append(trimHtml);
          },
        });
        break;
      case "trim-dropdown": // 상세
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
