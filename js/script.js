const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

// Close navbar when link is clicked
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

// Event Listeners: Handling toggle event
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]',
);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);

//  Store color theme for future visits

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark"); //add this
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light"); //add this
  }
}

// Save user preference on load

const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

//Adding date

let myDate = document.querySelector("#datee");

const yes = new Date().getFullYear();
myDate.innerHTML = yes;

let currentIndex = 0;
const images = document.querySelectorAll(".gallery img");
const totalImages = images.length;

// Open the lightbox
function openLightbox(event) {
  if (event.target.tagName === "IMG") {
    const clickedIndex = Array.from(images).indexOf(event.target);
    currentIndex = clickedIndex;
    updateLightboxImage();
    document.getElementById("lightbox").style.display = "flex";
  }
}

// Close the lightbox
function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

// Change the lightbox image based on direction (1 for next, -1 for prev)
function changeImage(direction) {
  currentIndex += direction;
  if (currentIndex >= totalImages) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = totalImages - 1;
  }
  updateLightboxImage();
}

// Update the lightbox image and thumbnails
function updateLightboxImage() {
  const lightboxImg = document.getElementById("lightbox-img");
  const thumbnailContainer = document.getElementById("thumbnail-container");

  // Update the main lightbox image
  lightboxImg.src = images[currentIndex].src;

  // Clear existing thumbnails
  thumbnailContainer.innerHTML = "";

  // Add new thumbnails
  images.forEach((image, index) => {
    const thumbnail = document.createElement("img");
    thumbnail.src = image.src;
    thumbnail.alt = `Thumbnail ${index + 1}`;
    thumbnail.classList.add("thumbnail");
    thumbnail.addEventListener("click", () => updateMainImage(index));
    thumbnailContainer.appendChild(thumbnail);
  });

  // Highlight the current thumbnail
  const thumbnails = document.querySelectorAll(".thumbnail");
  thumbnails[currentIndex].classList.add("active-thumbnail");
}

// Update the main lightbox image when a thumbnail is clicked
function updateMainImage(index) {
  currentIndex = index;
  updateLightboxImage();
}

// Add initial thumbnails
updateLightboxImage();

// To add keyboard navigation (left/right arrow keys)
document.addEventListener("keydown", function (e) {
  if (document.getElementById("lightbox").style.display === "flex") {
    if (e.key === "ArrowLeft") {
      changeImage(-1);
    } else if (e.key === "ArrowRight") {
      changeImage(1);
    }
  }
});

// IMAGE GALLERY
