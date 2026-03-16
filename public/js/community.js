$(() => {
  const generationSeq = $(".community-content").data("generation-seq");

  // === 차종 선택 모드 ===

  // 제조사 클릭 → 모델 목록 AJAX
  $(document).on("click", ".manufacturer-card", function () {
    const seq = $(this).data("seq");
    $.ajax({
      url: "/community/models/" + seq,
      method: "GET",
      success: function (models) {
        const $grid = $("#model-grid").empty();
        if (models.length === 0) {
          $grid.append('<p class="no-items">등록된 모델이 없습니다.</p>');
        } else {
          models.forEach(function (m) {
            $grid.append(
              '<button class="select-card model-card" data-seq="' + m.modelSeq + '">' +
              '<span class="card-name">' + m.modelName + '</span>' +
              '</button>'
            );
          });
        }
        $("#step-manufacturer").addClass("hidden");
        $("#step-model").removeClass("hidden");
      },
      error: function () {
        showAlert("모델 목록을 불러오는데 실패했습니다.");
      },
    });
  });

  // 모델 클릭 → 세대 목록 AJAX
  $(document).on("click", ".model-card", function () {
    const seq = $(this).data("seq");
    $.ajax({
      url: "/community/generations/" + seq,
      method: "GET",
      success: function (generations) {
        const $grid = $("#generation-grid").empty();
        if (generations.length === 0) {
          $grid.append('<p class="no-items">등록된 세대가 없습니다.</p>');
        } else {
          generations.forEach(function (g) {
            $grid.append(
              '<button class="select-card generation-card" data-seq="' + g.generationSeq + '">' +
              '<span class="card-name">' + g.generationName + '</span>' +
              '</button>'
            );
          });
        }
        $("#step-model").addClass("hidden");
        $("#step-generation").removeClass("hidden");
      },
      error: function () {
        showAlert("세대 목록을 불러오는데 실패했습니다.");
      },
    });
  });

  // 세대 클릭 → 게시판 이동
  $(document).on("click", ".generation-card", function () {
    const seq = $(this).data("seq");
    window.location.href = "/community?generationSeq=" + seq;
  });

  // 뒤로가기 버튼
  $(document).on("click", ".back-step-btn", function () {
    const target = $(this).data("target");
    $(".select-step").addClass("hidden");
    $("#step-" + target).removeClass("hidden");
  });

  // === 게시글 목록 모드 ===

  function getSort() {
    return $(".post-sort button.active").data("sort") || "latest";
  }

  function getCategory() {
    return $(".category-filter button.active").data("category") || "";
  }

  function buildUrl(page, keyword, sort, category) {
    let url = "/community?generationSeq=" + generationSeq + "&page=" + page;
    if (keyword) url += "&keyword=" + encodeURIComponent(keyword);
    if (sort && sort !== "latest") url += "&sort=" + sort;
    if (category) url += "&category=" + encodeURIComponent(category);
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
    window.location.href = buildUrl(1, keyword, getSort(), getCategory());
  }

  // 카테고리 필터 클릭
  $(".category-filter button").on("click", function () {
    const cat = $(this).data("category");
    const keyword = $(".search-input").val().trim();
    window.location.href = buildUrl(1, keyword, getSort(), cat);
  });

  // 정렬 버튼
  $(".post-sort button").on("click", function () {
    const sort = $(this).data("sort");
    const keyword = $(".search-input").val().trim();
    window.location.href = buildUrl(1, keyword, sort, getCategory());
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
    const gSeq = $(this).data("generation-seq");
    window.location.href = "/community/write?generationSeq=" + gSeq;
  });

  // 페이지네이션
  $(document).on("click", ".page-btn", function () {
    const page = $(this).data("page");
    const keyword = $(".search-input").val().trim();
    window.location.href = buildUrl(page, keyword, getSort(), getCategory());
  });

  // === 인기글 더보기 ===
  $(document).on("click", "#load-more-popular", function () {
    const $btn = $(this);
    const offset = $btn.data("offset");
    $btn.prop("disabled", true).text("로딩 중...");

    $.ajax({
      url: "/community/popular-posts?offset=" + offset,
      method: "GET",
      success: function (data) {
        if (data.posts && data.posts.length > 0) {
          data.posts.forEach(function (post) {
            var badges = '<div class="post-badges">';
            if (post.manufacturerName && post.modelName) {
              badges += '<span class="post-vehicle-badge">' + $("<span>").text(post.manufacturerName + ' ' + post.modelName + ' ' + post.generationName).html() + '</span>';
            }
            if (post.category) {
              badges += '<span class="category-badge">' + $("<span>").text(post.category).html() + '</span>';
            }
            badges += '</div>';

            var card = '<div class="post-card" data-seq="' + post.postSeq + '">' +
              badges +
              '<h3 class="post-title">' + $("<span>").text(post.title).html() + '</h3>' +
              '<p class="post-preview">' + $("<span>").text(post.preview ? post.preview.substring(0, 100) : '').html() + '</p>' +
              '<div class="post-meta">' +
              '<span class="post-author">' + $("<span>").text(post.author).html() + '</span>' +
              '<span class="post-date">' + new Date(post.createAt).toLocaleDateString('ko-KR') + '</span>' +
              '<div class="post-stats">' +
              '<span>♥ ' + post.likeCount + '</span>' +
              '<span>댓글 ' + post.commentCount + '</span>' +
              '<span>조회 ' + post.viewCount + '</span>' +
              '</div></div></div>';
            $("#popular-post-list").append(card);
          });
          $btn.data("offset", offset + data.posts.length);
          $btn.prop("disabled", false).text("더보기");
          if (!data.hasMore) {
            $btn.closest(".load-more-wrap").remove();
          }
        } else {
          $btn.closest(".load-more-wrap").remove();
        }
      },
      error: function () {
        $btn.prop("disabled", false).text("더보기");
        showAlert("인기글을 불러오는데 실패했습니다.");
      },
    });
  });
});
