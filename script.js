// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// --------------------
// Envelope click
// --------------------
envelope.addEventListener("click", () => {
  envelope.style.display = "none";
  letter.style.display = "flex";

  setTimeout(() => {
    document.querySelector(".letter-window").classList.add("open");
  }, 50);
});

// --------------------
// NO button messages
// --------------------
const noMessages = [
  "are u sure?",
  "wow… u just hate me",
  "NIGGA 😭",
  "be so fr",
  "ashuuuuu",
  "mf why 😤",
  "dil todh ta 💔",
  "ur so mean",
  "i see how it is 😒",
  "chal kr de meri jaan"
];

let noCount = 0;
const originalTitle = title.textContent;

// --------------------
// YES grow setup
// --------------------
let yesScale = 1;
let yesLocked = false;

yesBtn.style.position = "fixed";
yesBtn.style.left = "50%";
yesBtn.style.top = "50%";
yesBtn.style.transformOrigin = "center center";
yesBtn.style.transition = "transform 0.25s ease";

function applyYesTransform() {
  yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
}

function lockYesIfNeeded() {
  if (yesLocked) return;
  yesLocked = true;
  applyYesTransform();
}

function growYes() {
  lockYesIfNeeded();
  yesScale += 0.18;
  if (yesScale > 3.2) yesScale = 3.2;
  applyYesTransform();
}

// --------------------
// Phone vibration
// --------------------
function vibratePhone(pattern = 30) {
  if ("vibrate" in navigator) navigator.vibrate(pattern);
}

// --------------------
// NO button move logic
// --------------------
function moveNoButton() {
  // Change text
  title.textContent = noMessages[noCount % noMessages.length];
  noCount++;

  // YES grows every escape
  growYes();

  // Phone vibration (Android mostly)
  vibratePhone([20, 30, 20]);

  // Keep NO inside screen
  const rect = noBtn.getBoundingClientRect();
  const padding = 16;

  const maxX = window.innerWidth - rect.width - padding;
  const maxY = window.innerHeight - rect.height - padding;

  const randomX = Math.max(padding, Math.random() * maxX);
  const randomY = Math.max(padding, Math.random() * maxY);

  noBtn.style.position = "fixed";
  noBtn.style.transition = "transform 0.2s ease";
  noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

  // Reset title after a bit (if YES not clicked)
  clearTimeout(noBtn._titleTimeout);
  noBtn._titleTimeout = setTimeout(() => {
    if (buttons.style.display !== "none") {
      title.textContent = originalTitle;
    }
  }, 1200);
}

// Desktop hover
noBtn.addEventListener("mouseover", moveNoButton);

// Mobile tap
noBtn.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    moveNoButton();
  },
  { passive: false }
);

// Backup click handler
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});

// --------------------
// YES clicked
// --------------------
yesBtn.addEventListener("click", () => {
  title.textContent = "BALLEEEEEE!";
  catImg.src = "cat_dance.gif";

  document.querySelector(".letter-window").classList.add("final");
  buttons.style.display = "none";
  finalText.style.display = "block";

  // Celebration vibration
  vibratePhone([40, 40, 80, 40, 120]);
});

