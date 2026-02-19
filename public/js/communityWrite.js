$(() => {
  const isEditMode = $(".write-form").data("edit-mode") === true || $(".write-form").data("edit-mode") === "true";
  const postSeq = $(".write-form").data("post-seq");
  const selectedFiles = []; // 새 이미지 파일 배열 (삭제 시 null 처리)

  // 이미지 선택 버튼
  $("#image-upload-btn").on("click", function () {
    $("#image-input").trigger("click");
  });

  // 파일 선택 시 검증 + 미리보기
  $("#image-input").on("change", function () {
    const files = this.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) {
        showAlert("이미지 파일만 업로드 가능합니다.");
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        showAlert("파일 크기는 5MB 이하만 가능합니다: " + file.name);
        continue;
      }
      const index = selectedFiles.length;
      selectedFiles.push(file);

      const reader = new FileReader();
      reader.onload = function (e) {
        const $item = $('<div class="image-preview-item" data-index="' + index + '">');
        $item.append('<img src="' + e.target.result + '">');
        $item.append('<button type="button" class="image-delete-btn">&times;</button>');
        $(".image-preview-list").append($item);
      };
      reader.readAsDataURL(file);
    }
    // input 초기화 (같은 파일 재선택 가능하도록)
    $(this).val("");
  });

  // 새 이미지 미리보기 삭제
  $(".image-preview-list").on("click", ".image-delete-btn", function () {
    const $item = $(this).closest(".image-preview-item");
    const index = $item.data("index");
    selectedFiles[index] = null;
    $item.remove();
  });

  // 기존 이미지 삭제 (수정 모드)
  $(".existing-image-list").on("click", ".image-delete-btn", function () {
    const $item = $(this).closest(".existing-image-item");
    const imageSeq = $item.data("image-seq");
    showConfirm("이미지를 삭제하시겠습니까?", function () {
      $.ajax({
        url: "/community/image/" + imageSeq,
        method: "DELETE",
        success: function (data) {
          if (data.success) {
            $item.remove();
          }
        },
        error: function (xhr) {
          if (xhr.status === 401) {
            showAlert("로그인이 필요합니다.", function () {
              window.location.href = "/auth/login";
            });
            return;
          }
          if (xhr.status === 403) {
            showAlert("삭제 권한이 없습니다.");
            return;
          }
          showAlert("이미지 삭제에 실패했습니다.");
        },
      });
    });
  });

  // 게시글 작성/수정
  $(".submit-btn").on("click", function () {
    const $btn = $(this);
    const category = $("#category").val();
    const title = $("#title").val().trim();
    const content = $("#content").val().trim();

    if (!title) {
      showAlert("제목을 입력하세요.");
      return;
    }
    if (!content) {
      showAlert("내용을 입력하세요.");
      return;
    }

    $btn.prop("disabled", true);

    const formData = new FormData();
    formData.append("category", category);
    formData.append("title", title);
    formData.append("content", content);

    // 새 이미지 파일 추가 (null 제외)
    selectedFiles.forEach(function (file) {
      if (file) {
        formData.append("images", file);
      }
    });

    if (isEditMode) {
      $btn.text("수정 중...");
      $.ajax({
        url: "/community/" + postSeq,
        method: "PUT",
        data: formData,
        contentType: false,
        processData: false,
        success: function (data) {
          if (data.success) {
            showAlert("게시글이 수정되었습니다.", function () {
              window.location.href = "/communityDetail/" + postSeq;
            });
          }
        },
        error: function (xhr) {
          $btn.prop("disabled", false).text("수정하기");
          if (xhr.status === 401) {
            showAlert("로그인이 필요합니다.", function () {
              window.location.href = "/auth/login";
            });
            return;
          }
          if (xhr.status === 403) {
            showAlert("수정 권한이 없습니다.");
            return;
          }
          var msg = "게시글 수정에 실패했습니다.";
          if (xhr.responseJSON && xhr.responseJSON.message) {
            msg = xhr.responseJSON.message;
          }
          showAlert(msg);
        },
      });
    } else {
      $btn.text("작성 중...");
      $.ajax({
        url: "/community/write",
        method: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function (data) {
          if (data.success) {
            window.location.href = "/communityDetail/" + data.postSeq;
          }
        },
        error: function (xhr) {
          $btn.prop("disabled", false).text("작성하기");
          if (xhr.status === 401) {
            showAlert("로그인이 필요합니다.", function () {
              window.location.href = "/auth/login";
            });
            return;
          }
          var msg = "게시글 작성에 실패했습니다.";
          if (xhr.responseJSON && xhr.responseJSON.message) {
            msg = xhr.responseJSON.message;
          }
          showAlert(msg);
        },
      });
    }
  });

  // 취소
  $(".cancel-btn").on("click", function () {
    const message = isEditMode ? "수정을 취소하시겠습니까?" : "작성을 취소하시겠습니까?";
    showConfirm(message, function () {
      if (isEditMode) {
        window.location.href = "/communityDetail/" + postSeq;
      } else {
        window.location.href = "/community";
      }
    });
  });
});
