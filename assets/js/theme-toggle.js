// Theme and language helpers (stores preferences in localStorage)
function toggleTheme(themeName) {
  if (themeName === "default") {
    document.documentElement.removeAttribute("data-theme");
    localStorage.removeItem("technova_theme");
    return;
  }
  document.documentElement.setAttribute("data-theme", themeName);
  localStorage.setItem("technova_theme", themeName);
}

function initThemeFromStorage() {
  const stored = localStorage.getItem("technova_theme");
  if (stored) document.documentElement.setAttribute("data-theme", stored);
}

function setLanguage(lang) {
  if (lang === "ar") {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
  } else {
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
  }
  localStorage.setItem("technova_lang", lang);
}

function initLangFromStorage() {
  const stored = localStorage.getItem("technova_lang") || "ar";
  setLanguage(stored);
}

document.addEventListener("DOMContentLoaded", function () {
  initThemeFromStorage();
  initLangFromStorage();

  // Wire small UI toggles if exist
  const themeBtn = document.getElementById("themeToggleBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      // simple cycle: default -> navy -> accent -> default
      const current =
        document.documentElement.getAttribute("data-theme") || "default";
      const next =
        current === "default"
          ? "navy"
          : current === "navy"
          ? "accent"
          : "default";
      toggleTheme(next);
      this.textContent = next === "default" ? "الثيم" : next;
    });
  }

  const langBtn = document.getElementById("langToggleBtn");
  if (langBtn) {
    langBtn.addEventListener("click", function () {
      const next = document.documentElement.lang === "ar" ? "en" : "ar";
      setLanguage(next);
      this.textContent = next === "ar" ? "EN" : "AR";
      // simple full reload to re-render layouts if necessary
      setTimeout(() => location.reload(), 200);
    });
  }
});
