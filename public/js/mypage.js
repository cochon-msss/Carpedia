$(() => {
  // 북마크 카드 클릭 → 상세 페이지
  $(document).on("click", ".bookmark-card", function () {
    const postSeq = $(this).data("seq");
    window.location.href = "/communityDetail/" + postSeq;
  });

  // 페이지네이션
  $(document).on("click", ".page-btn", function () {
    const page = $(this).data("page");
    window.location.href = "/mypage?page=" + page;
  });
});
