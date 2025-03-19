$(() => {
  $(".car-search").on("click", function () {
    window.location.href = `/carInfo`;
  });
  $(document).ready(function () {
    $(".custom-dropdown").click(function (event) {
      event.stopPropagation();
      $(".custom-dropdown").not(this).removeClass("open");
      $(this).toggleClass("open");

      // search-form의 가로 크기를 가져와서 dropdown-list에 적용
      let searchFormWidth = $(".search-form").outerWidth();
      let dropdownList = $(this).find(".dropdown-list");

      dropdownList.css("width", searchFormWidth + "px");

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
});
