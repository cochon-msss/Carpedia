$(() => {
  $(document)
    .off("click", ".car_trim")
    .on("click", ".car_trim", function () {
      let trim_seq = $(this).find("span").attr("data-seq");
      $.ajax({
        url: `/carInfo/detail?trimSeq=` + trim_seq,
        method: "GET",
        beforeSend: function () {
          $(".car_info_detail").empty();
        },
        success: function (data) {
          $(".car_info_detail").append(data);
        },
      });
    });
});
