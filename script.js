// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Click Envelope
envelope.addEventListener("click", () => {
  envelope.style.display = "none";
  letter.style.display = "flex";

  setTimeout(() => {
    document.querySelector(".letter-window").classList.add("open");
  }, 50);
});

// Messages for NO button
const noMessages = [
  "wow… u just hate me ",
  "NIGGA 😭",
  "be so fr",
  "ashuuuuu", 
  "mf why 😤",
  "dil todh ta 💔",
  "ur so mean",
  "i see how it is 😒",
  "chal kr de meri jaan",
];

let noCount = 0;
let originalTitle = title.textContent;

// Logic to move the NO btn + change text
noBtn.addEventListener("mouseover", () => {
  // change message
  title.textContent = noMessages[noCount % noMessages.length];
  noCount++;

  // move button
  const distance = 200; // keeps your same "min=max=200" behavior
  const angle = Math.random() * Math.PI * 2;

  const moveX = Math.cos(angle) * distance;
  const moveY = Math.sin(angle) * distance;

  noBtn.style.transition = "transform 0.25s ease";
  noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;

  // optional: after a bit, return to the original title (comment out if you don't want this)
  clearTimeout(noBtn._titleTimeout);
  noBtn._titleTimeout = setTimeout(() => {
    // only revert if YES hasn't been clicked
    if (buttons.style.display !== "none") {
      title.textContent = originalTitle;
    }
  }, 1200);
});

// YES is clicked
yesBtn.addEventListener("click", () => {
  title.textContent = "BALLEEEEEE!";
  catImg.src = "cat_dance.gif";

  document.querySelector(".letter-window").classList.add("final");
  buttons.style.display = "none";
  finalText.style.display = "block";
});
