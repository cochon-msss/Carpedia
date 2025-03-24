$(() => {
  $(".car-search").on("click", function () {
    window.location.href = `/carInfo`;
  });

  $(".custom-dropdown").click(function (event) {
    event.stopPropagation();
    $(".custom-dropdown").not(this).removeClass("open");
    $(this).toggleClass("open");

    let dropdownList = $(this).find(".dropdown-list");

    if ($(this).hasClass("open")) {
      let dropdownWidth = $(this).outerWidth(); // 클릭된 요소의 너비 가져오기
      dropdownList.css("width", dropdownWidth + "px").addClass("open");
    } else {
      dropdownList.removeClass("open");
    }
  });

  // 창 크기 변경 시 다시 계산
  $(window).resize(updateDropdownWidth);

  $(".custom-dropdown").click(function (event) {
    event.stopPropagation();
    $(".custom-dropdown").not(this).removeClass("open");
    $(this).toggleClass("open");
    updateDropdownWidth();
    // search-form의 가로 크기를 가져와서 dropdown-list에 적용
    //let searchFormWidth = $(".search-form").outerWidth();
    let dropdownList = $(this).find(".dropdown-list");

    //dropdownList.css("width", searchFormWidth + "px");

    // 드롭다운 보이게 하기
    if ($(this).hasClass("open")) {
      dropdownList.addClass("open");
    } else {
      dropdownList.removeClass("open");
    }
  });

  $(".dropdown-list li").click(function (event) {
    event.stopPropagation();
    let selectedText = $(this).text();
    $(this).closest(".custom-dropdown").find(".selected").text(selectedText);
    $(this).closest(".custom-dropdown").removeClass("open");
    $(this).closest(".dropdown-list").removeClass("open");
  });

  $(document).click(function () {
    $(".custom-dropdown").removeClass("open");
    $(".dropdown-list").removeClass("open");
  });
});
