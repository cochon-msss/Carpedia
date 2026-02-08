$(() => {
  // 네비게이션
  $(".compare").on("click", function () {
    window.location.href = `/carCompare`;
  });

  $(".logo").on("click", function () {
    window.location.href = `/`;
  });

  $(".community").on("click", function () {
    window.location.href = `/community`;
  });

  $(".post-card").on("click", function () {
    window.location.href = `/communityDetail`;
  });

  // 다크모드 토글 버튼 클릭
  $(".theme-toggle").on("click", function () {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const newTheme = isDark ? "light" : "dark";
    if (newTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("theme", newTheme);
  });
});
