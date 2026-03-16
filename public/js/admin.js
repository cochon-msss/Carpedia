var visitLineChart = null;
var hourlyBarChart = null;
var signupLineChart = null;

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function escapeAttr(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function getDateRange(days) {
  var end = new Date();
  var start = new Date();
  start.setDate(start.getDate() - days);
  return { startDate: formatDate(start) + " 00:00:00", endDate: formatDate(end) + " 23:59:59" };
}

// ===== 요약 통계 =====
function loadSummary() {
  $.ajax({
    url: "/admin/stats/summary",
    method: "GET",
    success: function (data) {
      if (data.success) {
        $("#todayVisits").text(data.todayVisits.toLocaleString());
        $("#totalUsers").text(data.totalUsers.toLocaleString());
        $("#totalPosts").text(data.totalPosts.toLocaleString());
        $("#pendingReports").text(data.pendingReports.toLocaleString());
      }
    },
  });
}

// ===== 방문 통계 =====
function loadVisitStats(days) {
  var range = getDateRange(days);
  $.ajax({
    url: "/admin/stats/visits",
    method: "GET",
    data: range,
    success: function (data) {
      if (data.success) {
        renderVisitLineChart(data.dailyVisits, days);
        renderHourlyBarChart(data.hourlyVisits);
      }
    },
  });
}

function renderVisitLineChart(dailyVisits, days) {
  var ctx = document.getElementById("visitLineChart").getContext("2d");
  var dataMap = {};
  dailyVisits.forEach(function (item) {
    dataMap[formatDate(new Date(item.date))] = item.count;
  });
  var labels = [];
  var values = [];
  var end = new Date();
  for (var i = days - 1; i >= 0; i--) {
    var d = new Date();
    d.setDate(end.getDate() - i);
    var key = formatDate(d);
    labels.push(key.substring(5));
    values.push(dataMap[key] || 0);
  }
  if (visitLineChart) visitLineChart.destroy();
  visitLineChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "방문수", data: values,
        borderColor: "#6366f1", backgroundColor: "rgba(99, 102, 241, 0.1)",
        borderWidth: 2, fill: true, tension: 0.3, pointRadius: 3, pointBackgroundColor: "#6366f1",
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: "rgba(0,0,0,0.05)" } },
        x: { grid: { display: false } },
      },
    },
  });
}

function renderHourlyBarChart(hourlyVisits) {
  var ctx = document.getElementById("hourlyBarChart").getContext("2d");
  var dataMap = {};
  hourlyVisits.forEach(function (item) { dataMap[item.hour] = item.count; });
  var labels = [];
  var values = [];
  var colors = [];
  for (var h = 0; h < 24; h++) {
    labels.push(h + "시");
    values.push(dataMap[h] || 0);
    if (h < 6) colors.push("rgba(99, 102, 241, 0.3)");
    else if (h < 12) colors.push("rgba(20, 184, 166, 0.7)");
    else if (h < 18) colors.push("rgba(99, 102, 241, 0.7)");
    else colors.push("rgba(139, 92, 246, 0.7)");
  }
  if (hourlyBarChart) hourlyBarChart.destroy();
  hourlyBarChart = new Chart(ctx, {
    type: "bar",
    data: { labels: labels, datasets: [{ label: "방문수", data: values, backgroundColor: colors, borderRadius: 3 }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: "rgba(0,0,0,0.05)" } },
        x: { grid: { display: false }, ticks: { font: { size: 10 } } },
      },
    },
  });
}

// ===== 가입자 추이 =====
function loadSignupStats(days) {
  var range = getDateRange(days);
  $.ajax({
    url: "/admin/stats/signups",
    method: "GET",
    data: range,
    success: function (data) {
      if (data.success) {
        renderSignupLineChart(data.dailySignups, days);
      }
    },
  });
}

function renderSignupLineChart(dailySignups, days) {
  var ctx = document.getElementById("signupLineChart").getContext("2d");
  var dataMap = {};
  dailySignups.forEach(function (item) {
    dataMap[formatDate(new Date(item.date))] = item.count;
  });
  var labels = [];
  var values = [];
  var end = new Date();
  for (var i = days - 1; i >= 0; i--) {
    var d = new Date();
    d.setDate(end.getDate() - i);
    var key = formatDate(d);
    labels.push(key.substring(5));
    values.push(dataMap[key] || 0);
  }
  if (signupLineChart) signupLineChart.destroy();
  signupLineChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "가입수", data: values,
        borderColor: "#14b8a6", backgroundColor: "rgba(20, 184, 166, 0.1)",
        borderWidth: 2, fill: true, tension: 0.3, pointRadius: 3, pointBackgroundColor: "#14b8a6",
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: "rgba(0,0,0,0.05)" } },
        x: { grid: { display: false } },
      },
    },
  });
}

// ===== 커뮤니티 활동 =====
function loadRecentActivity() {
  $.ajax({
    url: "/admin/activity",
    method: "GET",
    success: function (data) {
      if (data.success) {
        renderRecentPosts(data.recentPosts);
        renderRecentComments(data.recentComments);
      }
    },
  });
}

function renderRecentPosts(posts) {
  var $list = $("#recentPostsList");
  $list.empty();
  if (posts.length === 0) {
    $list.append('<p class="empty-message">게시글이 없습니다.</p>');
    return;
  }
  posts.forEach(function (post) {
    var date = new Date(post.createAt).toLocaleDateString("ko-KR");
    $list.append(
      '<div class="activity-item">' +
        '<div class="activity-item-header">' +
          '<span class="activity-badge">' + escapeHtml(post.category) + '</span>' +
          '<span class="activity-date">' + date + '</span>' +
        '</div>' +
        '<p class="activity-item-title">' + escapeHtml(post.title) + '</p>' +
        '<div class="activity-item-meta">' +
          '<span>' + escapeHtml(post.author) + '</span>' +
          '<span>조회 ' + post.viewCount + '</span>' +
          '<span>댓글 ' + post.commentCount + '</span>' +
          '<span>좋아요 ' + post.likeCount + '</span>' +
        '</div>' +
      '</div>'
    );
  });
}

function renderRecentComments(comments) {
  var $list = $("#recentCommentsList");
  $list.empty();
  if (comments.length === 0) {
    $list.append('<p class="empty-message">댓글이 없습니다.</p>');
    return;
  }
  comments.forEach(function (comment) {
    var date = new Date(comment.createAt).toLocaleDateString("ko-KR");
    var content = comment.content.length > 50 ? comment.content.substring(0, 50) + "..." : comment.content;
    $list.append(
      '<div class="activity-item">' +
        '<div class="activity-item-header">' +
          '<span class="activity-author">' + escapeHtml(comment.author) + '</span>' +
          '<span class="activity-date">' + date + '</span>' +
        '</div>' +
        '<p class="activity-item-content">' + escapeHtml(content) + '</p>' +
        '<p class="activity-item-ref">' + escapeHtml(comment.postTitle) + '</p>' +
      '</div>'
    );
  });
}

// ===== 신고 관리 =====
function loadReports() {
  $.ajax({
    url: "/admin/reports",
    method: "GET",
    success: function (data) {
      if (data.success) renderReportTable(data.reports);
    },
  });
}

function renderReportTable(reports) {
  var $tbody = $("#reportTableBody");
  $tbody.empty();
  if (reports.length === 0) {
    $tbody.append('<tr><td colspan="8" class="empty-message">신고 내역이 없습니다.</td></tr>');
    return;
  }
  reports.forEach(function (report) {
    var typeLabel = report.targetType === "post" ? "게시글" : "댓글";
    var content = report.targetContent
      ? (report.targetContent.length > 30 ? report.targetContent.substring(0, 30) + "..." : report.targetContent)
      : "(삭제됨)";
    var reason = report.reason.length > 30 ? report.reason.substring(0, 30) + "..." : report.reason;
    var dateStr = new Date(report.createAt).toLocaleDateString("ko-KR");
    var statusBadge = "";
    var actionBtns = "";
    if (report.status === "pending") {
      statusBadge = '<span class="status-badge pending">대기</span>';
      actionBtns =
        '<button type="button" class="action-btn resolve-btn" data-seq="' + report.reportSeq + '">승인</button>' +
        '<button type="button" class="action-btn dismiss-btn" data-seq="' + report.reportSeq + '">기각</button>';
    } else if (report.status === "resolved") {
      statusBadge = '<span class="status-badge resolved">승인됨</span>';
      actionBtns = '<span class="action-done">처리 완료</span>';
    } else {
      statusBadge = '<span class="status-badge dismissed">기각됨</span>';
      actionBtns = '<span class="action-done">처리 완료</span>';
    }
    $tbody.append(
      "<tr>" +
        "<td>" + report.reportSeq + "</td>" +
        "<td>" + typeLabel + "</td>" +
        '<td class="content-cell" title="' + escapeAttr(report.targetContent || "") + '">' + escapeHtml(content) + "</td>" +
        '<td class="reason-cell" title="' + escapeAttr(report.reason) + '">' + escapeHtml(reason) + "</td>" +
        "<td>" + escapeHtml(report.reporterNickname) + "</td>" +
        "<td>" + dateStr + "</td>" +
        "<td>" + statusBadge + "</td>" +
        "<td>" + actionBtns + "</td>" +
      "</tr>"
    );
  });
}

function handleReport(reportSeq, action) {
  $.ajax({
    url: "/admin/reports/" + reportSeq,
    method: "PATCH",
    contentType: "application/json",
    data: JSON.stringify({ action: action }),
    success: function (data) {
      if (data.success) {
        showToast(action === "resolve" ? "신고가 승인되었습니다." : "신고가 기각되었습니다.");
        loadReports();
        loadSummary();
      } else {
        showAlert(data.message || "처리에 실패했습니다.");
      }
    },
    error: function () { showAlert("처리 중 오류가 발생했습니다."); },
  });
}

// ===== 사용자 관리 =====
var currentUserPage = 1;
var currentUserKeyword = "";

function loadUsers(page, keyword) {
  currentUserPage = page;
  currentUserKeyword = keyword || "";
  $.ajax({
    url: "/admin/users",
    method: "GET",
    data: { page: page, keyword: currentUserKeyword || undefined },
    success: function (data) {
      if (data.success) {
        renderUserTable(data.users);
        renderUserPagination(data.totalPages, page);
      }
    },
  });
}

function renderUserTable(users) {
  var $tbody = $("#userTableBody");
  $tbody.empty();
  if (users.length === 0) {
    $tbody.append('<tr><td colspan="6" class="empty-message">사용자가 없습니다.</td></tr>');
    return;
  }
  users.forEach(function (user) {
    var dateStr = new Date(user.createAt).toLocaleDateString("ko-KR");
    var isBanned = user.useFlag === "N";
    var statusBadge = isBanned
      ? '<span class="status-badge dismissed">차단됨</span>'
      : '<span class="status-badge resolved">정상</span>';
    var actionBtn = isBanned
      ? '<button type="button" class="action-btn unban-btn" data-seq="' + user.userSeq + '">해제</button>'
      : '<button type="button" class="action-btn ban-btn" data-seq="' + user.userSeq + '">차단</button>';
    $tbody.append(
      "<tr>" +
        "<td>" + user.userSeq + "</td>" +
        "<td>" + escapeHtml(user.email) + "</td>" +
        "<td>" + escapeHtml(user.nickname) + "</td>" +
        "<td>" + dateStr + "</td>" +
        "<td>" + statusBadge + "</td>" +
        "<td>" + actionBtn + "</td>" +
      "</tr>"
    );
  });
}

function renderUserPagination(totalPages, currentPage) {
  var $pag = $("#userPagination");
  $pag.empty();
  if (totalPages <= 1) return;
  for (var i = 1; i <= totalPages; i++) {
    $pag.append(
      '<button type="button" class="page-btn' + (i === currentPage ? ' active' : '') + '" data-page="' + i + '">' + i + '</button>'
    );
  }
}

function toggleUserStatus(userSeq, action) {
  $.ajax({
    url: "/admin/users/" + userSeq,
    method: "PATCH",
    contentType: "application/json",
    data: JSON.stringify({ action: action }),
    success: function (data) {
      if (data.success) {
        showToast(action === "ban" ? "사용자가 차단되었습니다." : "차단이 해제되었습니다.");
        loadUsers(currentUserPage, currentUserKeyword);
        loadSummary();
      } else {
        showAlert(data.message || "처리에 실패했습니다.");
      }
    },
    error: function () { showAlert("처리 중 오류가 발생했습니다."); },
  });
}

// ===== 로그 뷰어 =====
function loadLogs() {
  var date = $("#logDate").val();
  var type = $("#logType").val();
  if (!date) { showAlert("날짜를 선택해주세요."); return; }
  $("#logContent").text("로딩 중...");
  $.ajax({
    url: "/admin/logs",
    method: "GET",
    data: { date: date, type: type },
    success: function (data) {
      if (data.success) $("#logContent").text(data.content || "(빈 로그)");
    },
    error: function () { $("#logContent").text("로그를 불러오는데 실패했습니다."); },
  });
}

// ===== 초기화 =====
$(() => {
  $("#logDate").val(formatDate(new Date()));

  loadSummary();
  loadVisitStats(7);
  loadReports();

  // 방문 통계 기간 선택
  $(document).on("click", ".period-btn", function () {
    $(".period-btn").removeClass("active");
    $(this).addClass("active");
    loadVisitStats(parseInt($(this).data("days"), 10));
  });

  // 가입자 추이 기간 선택
  $(document).on("click", ".signup-period-btn", function () {
    $(".signup-period-btn").removeClass("active");
    $(this).addClass("active");
    loadSignupStats(parseInt($(this).data("days"), 10));
  });

  // 탭 전환
  $(document).on("click", ".admin-tab", function () {
    $(".admin-tab").removeClass("active");
    $(this).addClass("active");
    $(".tab-content").removeClass("active");
    var tab = $(this).data("tab");
    $("#tab-" + tab).addClass("active");

    // 탭 최초 진입 시 데이터 로드
    if (tab === "signups" && !signupLineChart) loadSignupStats(7);
    if (tab === "activity" && $("#recentPostsList .activity-item").length === 0) loadRecentActivity();
    if (tab === "users" && $("#userTableBody .empty-message").text() === "로딩 중...") loadUsers(1);
  });

  // 신고 처리
  $(document).on("click", ".resolve-btn", function () {
    var seq = $(this).data("seq");
    showConfirm("이 신고를 승인하시겠습니까? 해당 콘텐츠가 삭제됩니다.", function () { handleReport(seq, "resolve"); });
  });
  $(document).on("click", ".dismiss-btn", function () {
    var seq = $(this).data("seq");
    showConfirm("이 신고를 기각하시겠습니까?", function () { handleReport(seq, "dismiss"); });
  });

  // 사용자 차단/해제
  $(document).on("click", ".ban-btn", function () {
    var seq = $(this).data("seq");
    showConfirm("이 사용자를 차단하시겠습니까?", function () { toggleUserStatus(seq, "ban"); });
  });
  $(document).on("click", ".unban-btn", function () {
    var seq = $(this).data("seq");
    showConfirm("이 사용자의 차단을 해제하시겠습니까?", function () { toggleUserStatus(seq, "unban"); });
  });

  // 사용자 검색
  $("#userSearchBtn").on("click", function () { loadUsers(1, $("#userSearchInput").val().trim()); });
  $("#userSearchInput").on("keydown", function (e) {
    if (e.key === "Enter") loadUsers(1, $(this).val().trim());
  });

  // 사용자 페이지네이션
  $(document).on("click", ".page-btn", function () { loadUsers(parseInt($(this).data("page"), 10), currentUserKeyword); });

  // 로그 조회
  $("#loadLogBtn").on("click", function () { loadLogs(); });
});
