// 토스트 메시지
function showToast(message, duration = 2000) {
  $(".toast-message").remove();
  const $toast = $(`<div class="toast-message">${message}</div>`);
  $("body").append($toast);
  requestAnimationFrame(() => $toast.addClass("show"));
  setTimeout(() => {
    $toast.removeClass("show");
    setTimeout(() => $toast.remove(), 300);
  }, duration);
}

// 상대 시간 포맷
function formatRelativeDate(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffDay > 7) {
    return date.toLocaleDateString("ko-KR");
  } else if (diffDay > 0) {
    return diffDay + "일 전";
  } else if (diffHour > 0) {
    return diffHour + "시간 전";
  } else if (diffMin > 0) {
    return diffMin + "분 전";
  } else {
    return "방금 전";
  }
}

// 커스텀 알림 모달
function showAlert(message, callback) {
  $(".custom-alert-overlay").remove();

  const $overlay = $(`
    <div class="custom-alert-overlay">
      <div class="custom-alert">
        <p class="custom-alert-message">${message}</p>
        <div class="custom-alert-actions">
          <button type="button" class="custom-alert-confirm">확인</button>
        </div>
      </div>
    </div>
  `);

  $("body").append($overlay);
  requestAnimationFrame(() => $overlay.addClass("active"));
  $overlay.find(".custom-alert-confirm").focus();

  $overlay.find(".custom-alert-confirm").on("click", function () {
    $overlay.removeClass("active");
    setTimeout(() => {
      $overlay.remove();
      if (callback) callback();
    }, 200);
  });
}

// 커스텀 확인 모달
function showConfirm(message, onConfirm, onCancel) {
  $(".custom-alert-overlay").remove();

  const $overlay = $(`
    <div class="custom-alert-overlay">
      <div class="custom-alert">
        <p class="custom-alert-message">${message}</p>
        <div class="custom-alert-actions">
          <button type="button" class="custom-alert-cancel">취소</button>
          <button type="button" class="custom-alert-confirm">확인</button>
        </div>
      </div>
    </div>
  `);

  $("body").append($overlay);
  requestAnimationFrame(() => $overlay.addClass("active"));
  $overlay.find(".custom-alert-confirm").focus();

  $overlay.find(".custom-alert-confirm").on("click", function () {
    $overlay.removeClass("active");
    setTimeout(() => {
      $overlay.remove();
      if (onConfirm) onConfirm();
    }, 200);
  });

  $overlay.find(".custom-alert-cancel").on("click", function () {
    $overlay.removeClass("active");
    setTimeout(() => {
      $overlay.remove();
      if (onCancel) onCancel();
    }, 200);
  });
}

$(() => {
  // 네비게이션
  $(".compare").on("click", function () {
    window.location.href = `/carCompare`;
  });

  $(".logo").on("click", function () {
    window.location.href = `/`;
  });

  $(".cost-calc").on("click", function () {
    window.location.href = `/costCalc`;
  });

  $(".car-recommend").on("click", function () {
    window.location.href = `/carRecommend`;
  });

  $(".spec-ranking").on("click", function () {
    window.location.href = `/specRanking`;
  });

  $(".community").on("click", function () {
    window.location.href = `/community`;
  });

  // 알림 벨
  function updateNotificationBadge() {
    $.ajax({
      url: "/notification/unread-count",
      method: "GET",
      success: function (data) {
        if (data.success) {
          const $badge = $(".notification-badge");
          if (data.unreadCount > 0) {
            $badge.text(data.unreadCount > 99 ? "99+" : data.unreadCount);
            $badge.removeClass("hidden");
          } else {
            $badge.addClass("hidden");
          }
        }
      },
    });
  }

  if ($(".notification-bell").length > 0) {
    updateNotificationBadge();
    setInterval(updateNotificationBadge, 60000);
  }

  $(".notification-bell").on("click", function () {
    window.location.href = "/notification";
  });

  // 마이페이지
  $(".mypage-btn").on("click", function () {
    window.location.href = "/mypage";
  });

  // 로그인/로그아웃
  $(".login-link").on("click", function () {
    window.location.href = "/auth/login";
  });

  $(".logout-btn").on("click", function () {
    $.ajax({
      url: "/auth/logout",
      method: "POST",
      success: function (data) {
        if (data.success) {
          window.location.reload();
        }
      },
    });
  });
});
