$(() => {
  $(document)
    .off("click", ".car_trim")
    .on("click", ".car_trim", function () {
      // 활성 탭 표시
      $(".car_trim").removeClass("active");
      $(this).addClass("active");

      let trimSeq = $(this).find("span").attr("data-seq");
      $.ajax({
        url: `/carInfo/detail?trimSeq=` + trimSeq,
        method: "GET",
        beforeSend: function () {
          $(".car_info_detail").empty();
        },
        success: function (data) {
          $(".car_info_detail").append(data);
        },
      });
    });

  // 페이지 로드 시 첫 번째 트림 자동 클릭
  const firstTrim = $(".car_trim").first();
  if (firstTrim.length) {
    firstTrim.trigger("click");
  }
});
