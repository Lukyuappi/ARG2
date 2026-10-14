// キャリア採用マイページ共通スクリプト
// GitHub Pages は静的ホスティングのため、登録・ログインは localStorage に
// 応募者情報を保存するだけの「なりきり」演出です（どこにも送信されません）。

const PROFILE_KEY = "imanohara_recruit_profile";
const FLAG_KEY = "imanohara_recruit_flags";

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // プライベートブラウズ等で保存できない場合はその場限りで進める
  }
}

function getProfile() {
  return loadJSON(PROFILE_KEY, null);
}

// エントリーフォームの送信処理（entry.html）
function submitEntry(event) {
  event.preventDefault();
  const form = event.target;
  const data = Object.fromEntries(new FormData(form).entries());
  data.registeredAt = new Date().toISOString();
  // 受付番号（それっぽい番号を生成）
  data.applicantId = "C" + String(Date.now()).slice(-7);
  saveJSON(PROFILE_KEY, data);
  window.location.href = "mypage.html";
}

// マイページ各ページの冒頭で呼ぶ。未登録ならエントリーページへ戻す
function requireLogin() {
  const profile = getProfile();
  if (!profile) {
    window.location.replace("entry.html");
    return null;
  }
  document.querySelectorAll("[data-name]").forEach((el) => {
    el.textContent = profile.name || "応募者";
  });
  document.querySelectorAll("[data-applicant-id]").forEach((el) => {
    el.textContent = profile.applicantId || "―";
  });
  return profile;
}

function logout() {
  try {
    localStorage.removeItem(PROFILE_KEY);
    localStorage.removeItem(FLAG_KEY);
  } catch (e) {}
  window.location.href = "../recruit.html";
}

// 進行フラグ（閲覧済みページなど）
function setFlag(name) {
  const flags = loadJSON(FLAG_KEY, {});
  flags[name] = true;
  saveJSON(FLAG_KEY, flags);
}

function hasFlag(name) {
  return !!loadJSON(FLAG_KEY, {})[name];
}

// 登録日を基準にした日付（メッセージの受信日表示用）
function dateFromRegistration(profile, offsetDays) {
  const base = profile && profile.registeredAt ? new Date(profile.registeredAt) : new Date();
  base.setDate(base.getDate() + offsetDays);
  const y = base.getFullYear();
  const m = String(base.getMonth() + 1).padStart(2, "0");
  const d = String(base.getDate()).padStart(2, "0");
  return `${y}/${m}/${d}`;
}
