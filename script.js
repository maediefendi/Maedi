// ===============================
// DYNAMIC PAGE PORTFOLIO
// ===============================

const menuLinks = document.querySelectorAll(".menu-link");
const pageSections = document.querySelectorAll(".page");
const menuTriggers = document.querySelectorAll(".menu-trigger");

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

// Fungsi utama pindah halaman
function showPage(pageId) {
  pageSections.forEach(page => {
    page.classList.remove("active");
  });

  const targetPage = document.getElementById(pageId);

  if (targetPage) {
    targetPage.classList.add("active");
  }

  menuLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("data-page") === pageId) {
      link.classList.add("active");
    }
  });

  // Simpan halaman terakhir ke localStorage
  localStorage.setItem("activePage", pageId);

  // Tutup sidebar mobile setelah klik menu
  closeMobileSidebar();

  // Scroll ke atas area halaman
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Klik menu sidebar
menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    const pageId = link.getAttribute("data-page");
    showPage(pageId);
  });
});

// Klik card highlight / button internal
menuTriggers.forEach(trigger => {
  trigger.addEventListener("click", () => {
    const pageId = trigger.getAttribute("data-page");
    showPage(pageId);
  });
});

// Load halaman terakhir ketika refresh
document.addEventListener("DOMContentLoaded", () => {
  const savedPage = localStorage.getItem("activePage") || "home";
  showPage(savedPage);
});

// ===============================
// MOBILE SIDEBAR
// ===============================

function openMobileSidebar() {
  sidebar.classList.add("show");
  sidebarOverlay.classList.add("show");
}

function closeMobileSidebar() {
  sidebar.classList.remove("show");
  sidebarOverlay.classList.remove("show");
}

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", openMobileSidebar);
}

if (sidebarOverlay) {
  sidebarOverlay.addEventListener("click", closeMobileSidebar);
}

// Tutup sidebar jika tekan tombol ESC
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileSidebar();
  }
});

// ===============================
// ACTIVE HASH SUPPORT OPTIONAL
// Contoh: index.html#project langsung buka project
// ===============================

window.addEventListener("load", () => {
  const hash = window.location.hash.replace("#", "");

  if (hash) {
    const target = document.getElementById(hash);

    if (target && target.classList.contains("page")) {
      showPage(hash);
    }
  }
});

// Update URL hash tanpa reload
function updateUrlHash(pageId) {
  history.replaceState(null, "", `#${pageId}`);
}

// Tambahkan update hash ketika showPage dijalankan
const originalShowPage = showPage;

showPage = function (pageId) {
  pageSections.forEach(page => {
    page.classList.remove("active");
  });

  const targetPage = document.getElementById(pageId);

  if (targetPage) {
    targetPage.classList.add("active");
  }

  menuLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("data-page") === pageId) {
      link.classList.add("active");
    }
  });

  localStorage.setItem("activePage", pageId);
  updateUrlHash(pageId);
  closeMobileSidebar();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};