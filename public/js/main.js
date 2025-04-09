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

  $(".dropdown-list li").click(function (event) {
    event.stopPropagation();
    let selectedText = $(this).text().trim();
    let custom_dropdown = $(this).closest(".custom-dropdown");
    custom_dropdown.find(".selected").text(selectedText);
    custom_dropdown.removeClass("open");
    $(this).closest(".dropdown-list").removeClass("open");

    let thisId = custom_dropdown.attr("id");
    switch (thisId) {
      case "brand-dropdown":
        $("#model-dropdown")
          .addClass("open")
          .find(".dropdown-list")
          .addClass("open");
        let manufacturerId = $(this).attr("data-id");
        $.ajax({
          url: "/" + manufacturerId,
          method: "GET",
          success: function (data) {
            console.log(data);
          },
        });
        break;
      case "model-dropdown":
        $("#trim-dropdown")
          .addClass("open")
          .find(".dropdown-list")
          .addClass("open");

        break;
      case "trim-dropdown":
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
