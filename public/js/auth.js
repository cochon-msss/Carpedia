$(() => {
  // 로그인
  $(".login-btn").on("click", function () {
    const email = $("#email").val().trim();
    const password = $("#password").val().trim();

    if (!email) {
      showAlert("이메일을 입력하세요.");
      return;
    }
    if (!password) {
      showAlert("비밀번호를 입력하세요.");
      return;
    }

    $.ajax({
      url: "/auth/login",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ email, password }),
      success: function (data) {
        if (data.success) {
          window.location.href = "/";
        }
      },
      error: function (xhr) {
        const msg = xhr.responseJSON?.message || "로그인에 실패했습니다.";
        $(".error-message").text(msg).show();
      },
    });
  });

  // 회원가입
  $(".register-btn").on("click", function () {
    const email = $("#email").val().trim();
    const nickname = $("#nickname").val().trim();
    const password = $("#password").val().trim();
    const passwordConfirm = $("#passwordConfirm").val().trim();

    if (!email) {
      showAlert("이메일을 입력하세요.");
      return;
    }
    if (!nickname) {
      showAlert("닉네임을 입력하세요.");
      return;
    }
    if (!password) {
      showAlert("비밀번호를 입력하세요.");
      return;
    }
    if (password.length < 8) {
      showAlert("비밀번호는 8자 이상이어야 합니다.");
      return;
    }
    if (password !== passwordConfirm) {
      showAlert("비밀번호가 일치하지 않습니다.");
      return;
    }

    $.ajax({
      url: "/auth/register",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ email, password, nickname }),
      success: function (data) {
        if (data.success) {
          showAlert("회원가입이 완료되었습니다.", function () {
            window.location.href = "/auth/login";
          });
        }
      },
      error: function (xhr) {
        const msg = xhr.responseJSON?.message || "회원가입에 실패했습니다.";
        $(".error-message").text(msg).show();
      },
    });
  });
});
