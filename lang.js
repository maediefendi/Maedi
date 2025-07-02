const translations = {
    id: {
      "about.title": "Tentang Saya",
      "about.desc": "Saya adalah seorang profesional serbaguna yang memiliki minat...",
      "home.heroTitle": "Mendukung Operasional Digital dengan Sentuhan Kreatif",
      "home.heroDesc": "Menggabungkan keahlian administratif, teknis, dan kreatif...",
      // tambahkan seluruh key teks lainnya...
    },
    en: {
      "about.title": "About Me",
      "about.desc": "I am a versatile professional with skills in frontend development...",
      "home.heroTitle": "Supporting Digital Operations with a Creative Touch",
      "home.heroDesc": "Combining administrative, technical, and creative skills...",
      // key lainnya...
    }
  };

  function setLanguage(lang) {
    localStorage.setItem("lang", lang);
    updateContent(lang);
  }

  function updateContent(lang) {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
  }

  // Load default language on page load
  const defaultLang = localStorage.getItem("lang") || "id";
  document.addEventListener("DOMContentLoaded", () => {
    updateContent(defaultLang);
  });