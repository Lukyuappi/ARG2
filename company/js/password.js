// パスワード保護ページ共通ヘルパー
// GitHub Pages は静的ホスティングのため、本物のセキュリティではなく
// 「合言葉を知っていれば読める」演出として割り切っています。
// TODO: password は CHANGE_ME の仮値です。本番用の値に差し替えてください。
function checkPassword(inputId, errorId, correctPassword, targetUrl) {
  const input = document.getElementById(inputId).value.trim();
  const error = document.getElementById(errorId);

  if (input === correctPassword) {
    window.location.href = targetUrl;
  } else {
    error.hidden = false;
  }
}
