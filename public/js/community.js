$(() => {
  function getSort() {
    return $(".post-sort button.active").data("sort") || "latest";
  }

  function buildUrl(category, page, keyword, sort) {
    let url = "/community?category=" + encodeURIComponent(category) + "&page=" + page;
    if (keyword) url += "&keyword=" + encodeURIComponent(keyword);
    if (sort && sort !== "latest") url += "&sort=" + sort;
    return url;
  }

  // 검색
  $(".search-btn").on("click", function () {
    performSearch();
  });

  $(".search-input").on("keypress", function (e) {
    if (e.which === 13) {
      performSearch();
    }
  });

  function performSearch() {
    const keyword = $(".search-input").val().trim();
    const category = $(".post-filter button.active").data("category");
    window.location.href = buildUrl(category, 1, keyword, getSort());
  }

  // 카테고리 필터
  $(".post-filter button").on("click", function () {
    const category = $(this).data("category");
    const keyword = $(".search-input").val().trim();
    window.location.href = buildUrl(category, 1, keyword, getSort());
  });

  // 정렬 버튼
  $(".post-sort button").on("click", function () {
    const sort = $(this).data("sort");
    const category = $(".post-filter button.active").data("category");
    const keyword = $(".search-input").val().trim();
    window.location.href = buildUrl(category, 1, keyword, sort);
  });

  // 게시글 클릭 → 상세 페이지
  $(document).on("click", ".post-card", function () {
    const postSeq = $(this).data("seq");
    window.location.href = "/communityDetail/" + postSeq;
  });

  // 글쓰기 버튼
  $(".write-btn").on("click", function () {
    if ($(this).hasClass("login-required")) {
      showAlert("로그인이 필요합니다.", function () {
        window.location.href = "/auth/login";
      });
      return;
    }
    window.location.href = "/community/write";
  });

  // 페이지네이션
  $(document).on("click", ".page-btn", function () {
    const page = $(this).data("page");
    const category = $(".post-filter button.active").data("category");
    const keyword = $(".search-input").val().trim();
    window.location.href = buildUrl(category, page, keyword, getSort());
  });
});
