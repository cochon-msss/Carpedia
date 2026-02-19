$(() => {
  const postSeq = $(".community-detail").data("post-seq");
  let parentCommentSeq = null;

  // 답글 버튼 클릭
  $(document).on("click", ".comment-reply-btn", function () {
    const commentSeq = $(this).data("comment-seq");
    const author = $(this).data("author");
    parentCommentSeq = commentSeq;
    $(".reply-info").removeClass("hidden");
    $(".reply-to").text("@" + author + " 에게 답글 작성 중");
    $(".comment-input").attr("placeholder", author + "님에게 답글을 입력하세요...").focus();
  });

  // 답글 취소
  $(".reply-cancel").on("click", function () {
    parentCommentSeq = null;
    $(".reply-info").addClass("hidden");
    $(".comment-input").attr("placeholder", "댓글을 입력하세요...");
  });

  // 댓글 작성
  $(".comment-submit").on("click", function () {
    const $btn = $(this);
    const content = $(".comment-input").val().trim();

    if (!content) {
      showAlert("댓글 내용을 입력하세요.");
      return;
    }

    $btn.prop("disabled", true).text("작성 중...");

    const payload = { content };
    if (parentCommentSeq) {
      payload.parentCommentSeq = parentCommentSeq;
    }

    $.ajax({
      url: "/community/" + postSeq + "/comment",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(payload),
      success: function (data) {
        if (data.success) {
          location.reload();
        }
      },
      error: function (xhr) {
        $btn.prop("disabled", false).text("댓글 작성");
        if (xhr.status === 401) {
          showAlert("로그인이 필요합니다.", function () {
            window.location.href = "/auth/login";
          });
          return;
        }
        showAlert("댓글 작성에 실패했습니다.");
      },
    });
  });

  // 북마크 토글
  $(".bookmark-btn").on("click", function () {
    const $btn = $(this);
    const seq = $btn.data("post-seq");

    $.ajax({
      url: "/community/" + seq + "/bookmark",
      method: "POST",
      success: function (data) {
        if (data.success) {
          $btn.toggleClass("bookmarked", data.bookmarked);
          $btn.find(".bookmark-icon").text(data.bookmarked ? "★" : "☆");
          $btn.find(".bookmark-text").text(data.bookmarked ? "북마크 해제" : "북마크");
          showToast(data.bookmarked ? "북마크에 추가되었습니다." : "북마크가 해제되었습니다.");
        }
      },
      error: function (xhr) {
        if (xhr.status === 401) {
          showAlert("로그인이 필요합니다.", function () {
            window.location.href = "/auth/login";
          });
          return;
        }
        showAlert("북마크 처리에 실패했습니다.");
      },
    });
  });

  // 공유 버튼
  $(".share-btn").on("click", function () {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(function () {
      showToast("링크가 클립보드에 복사되었습니다.");
    }).catch(function () {
      showToast("링크 복사에 실패했습니다.");
    });
  });

  // 목록으로
  $(".back-btn").on("click", function () {
    window.location.href = "/community";
  });

  // 수정 버튼
  $(".edit-btn").on("click", function () {
    window.location.href = "/community/" + postSeq + "/edit";
  });

  // 삭제 버튼
  $(".delete-btn").on("click", function () {
    showConfirm("게시글을 삭제하시겠습니까?", function () {
      $.ajax({
        url: "/community/" + postSeq,
        method: "DELETE",
        success: function (data) {
          if (data.success) {
            showAlert("게시글이 삭제되었습니다.", function () {
              window.location.href = "/community";
            });
          }
        },
        error: function () {
          showAlert("게시글 삭제에 실패했습니다.");
        },
      });
    });
  });

  // 게시글 좋아요
  $(".post-like-btn").on("click", function () {
    const $btn = $(this);
    const seq = $btn.data("post-seq");

    $.ajax({
      url: "/community/" + seq + "/like",
      method: "POST",
      success: function (data) {
        if (data.success) {
          $btn.find(".like-icon").text(data.liked ? "♥" : "♡");
          $btn.find(".like-count").text(data.likeCount);
          $btn.toggleClass("liked", data.liked);
        }
      },
      error: function (xhr) {
        if (xhr.status === 401) {
          showAlert("로그인이 필요합니다.", function () {
            window.location.href = "/auth/login";
          });
          return;
        }
        showAlert("좋아요 처리에 실패했습니다.");
      },
    });
  });

  // 댓글 좋아요
  $(document).on("click", ".comment-like-btn", function () {
    const $btn = $(this);
    const commentSeq = $btn.data("comment-seq");

    $.ajax({
      url: "/community/comment/" + commentSeq + "/like",
      method: "POST",
      success: function (data) {
        if (data.success) {
          $btn.find(".like-icon").text(data.liked ? "♥" : "♡");
          $btn.find(".like-count").text(data.likeCount);
          $btn.toggleClass("liked", data.liked);
        }
      },
      error: function (xhr) {
        if (xhr.status === 401) {
          showAlert("로그인이 필요합니다.", function () {
            window.location.href = "/auth/login";
          });
          return;
        }
        showAlert("좋아요 처리에 실패했습니다.");
      },
    });
  });

  // 신고 모달
  let reportTarget = {};

  $(document).on("click", ".report-btn", function () {
    reportTarget = {
      targetType: $(this).data("target-type"),
      targetSeq: $(this).data("target-seq"),
    };
    $(".report-reason").val("");
    $(".report-modal-overlay").removeClass("hidden");
  });

  $(".report-cancel").on("click", function () {
    $(".report-modal-overlay").addClass("hidden");
  });

  $(".report-modal-overlay").on("click", function (e) {
    if ($(e.target).hasClass("report-modal-overlay")) {
      $(this).addClass("hidden");
    }
  });

  $(".report-submit").on("click", function () {
    const reason = $(".report-reason").val().trim();
    if (!reason) {
      showAlert("신고 사유를 입력하세요.");
      return;
    }
    const $btn = $(this);
    $btn.prop("disabled", true);

    $.ajax({
      url: "/community/report",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        targetType: reportTarget.targetType,
        targetSeq: reportTarget.targetSeq,
        reason: reason,
      }),
      success: function (data) {
        $(".report-modal-overlay").addClass("hidden");
        $btn.prop("disabled", false);
        if (data.success) {
          showAlert("신고가 접수되었습니다.");
        } else {
          showAlert(data.message || "신고 처리에 실패했습니다.");
        }
      },
      error: function (xhr) {
        $btn.prop("disabled", false);
        $(".report-modal-overlay").addClass("hidden");
        if (xhr.status === 401) {
          showAlert("로그인이 필요합니다.", function () {
            window.location.href = "/auth/login";
          });
          return;
        }
        showAlert("신고 처리에 실패했습니다.");
      },
    });
  });

  // 댓글 삭제
  $(document).on("click", ".comment-delete-btn", function () {
    const $comment = $(this).closest(".comment");
    const commentSeq = $comment.data("comment-seq");

    showConfirm("댓글을 삭제하시겠습니까?", function () {
      $.ajax({
        url: "/community/comment/" + commentSeq,
        method: "DELETE",
        success: function (data) {
          if (data.success) {
            location.reload();
          }
        },
        error: function () {
          showAlert("댓글 삭제에 실패했습니다.");
        },
      });
    });
  });
});
