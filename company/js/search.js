// サイト内検索（合言葉判定）
// TODO: secret は仮値です。本番では分からないように変更してください。
function checkKeyword() {
  const input = document.getElementById("searchInput").value.trim();
  const secret = "imanohara"; // ★鍵ワード（CHANGE_ME）

  if (input.toLowerCase() === secret) {
    window.location.href = "hidden/fragment-01.html";
  } else {
    alert("該当する情報は見つかりませんでした。");
  }
}
