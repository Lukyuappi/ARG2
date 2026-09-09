function checkKeyword() {
  const input = document.getElementById("searchInput").value.trim();
  const secret = "konnohara"; // ★鍵ワード（後で変えてOK）

  if (input.toLowerCase() === secret) {
    window.location.href = "hidden/fragment-01.html";
  } else {
    alert("該当する情報は見つかりませんでした。");
  }
}
