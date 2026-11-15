document.documentElement.classList.add("has-js");

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");

if (menuToggle && primaryNav) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    primaryNav.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    primaryNav.classList.toggle("is-open", !isOpen);
  });

  primaryNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

const imageDialog = document.querySelector(".image-dialog");
const dialogImage = imageDialog?.querySelector("img");
const closeDialogButton = imageDialog?.querySelector(".dialog-close");
let lastGalleryLink = null;

if (imageDialog && dialogImage && typeof imageDialog.showModal === "function") {
  document.querySelectorAll(".gallery-open").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      lastGalleryLink = link;
      dialogImage.src = link.dataset.image || link.href;
      dialogImage.alt = link.dataset.alt || "Фотография студии Easy Cuts";
      imageDialog.showModal();
      closeDialogButton?.focus();
    });
  });

  closeDialogButton?.addEventListener("click", () => imageDialog.close());

  imageDialog.addEventListener("click", (event) => {
    if (event.target === imageDialog) imageDialog.close();
  });

  imageDialog.addEventListener("close", () => lastGalleryLink?.focus());
}
