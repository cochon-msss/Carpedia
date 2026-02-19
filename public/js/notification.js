$(() => {
  // 모두 읽음
  $(".read-all-btn").on("click", function () {
    $.ajax({
      url: "/notification/read-all",
      method: "POST",
      success: function (data) {
        if (data.success) {
          $(".notification-item.unread").removeClass("unread");
          showToast("모든 알림을 읽음 처리했습니다.");
        }
      },
      error: function () {
        showAlert("처리에 실패했습니다.");
      },
    });
  });

  // 페이지네이션
  $(document).on("click", ".page-btn", function () {
    const page = $(this).data("page");
    window.location.href = "/notification?page=" + page;
  });
});
