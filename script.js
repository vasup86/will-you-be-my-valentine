// --- Floating hearts background
const hearts = document.getElementById("hearts");
const heartChars = ["💗", "💖", "💘", "💝", "💞", "💕", "💓", "💟"];
function spawnHeart() {
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
  const left = Math.random() * 100;
  const size = 14 + Math.random() * 22;
  const duration = 6 + Math.random() * 6;
  const drift = (Math.random() * 120 - 60).toFixed(0) + "px";
  h.style.left = left + "vw";
  h.style.fontSize = size + "px";
  h.style.animationDuration = duration + "s";
  h.style.setProperty("--drift", drift);
  hearts.appendChild(h);
  setTimeout(() => h.remove(), duration * 1000);
}
setInterval(spawnHeart, 280);
for (let i = 0; i < 10; i++) setTimeout(spawnHeart, i * 180);

// --- Buttons behavior
const yes = document.getElementById("yes");
const no = document.getElementById("no");
const pop = document.getElementById("pop");
const hint = document.getElementById("hint");
const btnArea = document.getElementById("btnArea");

yes.addEventListener("click", () => {
  pop.classList.add("show");
  hint.textContent = "Okay now we have to celebrate 😌🎉";
  burstHearts();
  // Make "No" stop running after yes
  no.style.pointerEvents = "none";
  no.style.opacity = 0.5;
});

// Make the No button dodge the cursor/tap
function moveNoButton() {
  const area = btnArea.getBoundingClientRect();
  const btn = no.getBoundingClientRect();

  // keep inside area
  const padding = 6;
  const maxX = area.width - btn.width - padding;
  const maxY = area.height - btn.height - padding;

  const x = Math.max(padding, Math.random() * maxX);
  const y = Math.max(padding, Math.random() * maxY);

  no.style.position = "absolute";
  no.style.left = x + "px";
  no.style.top = y + "px";

  hint.textContent = "Nope 😄 try again…";
}

// mouse + touch friendly
no.addEventListener("mouseenter", moveNoButton);
no.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    moveNoButton();
  },
  { passive: false },
);
no.addEventListener("click", moveNoButton);

function burstHearts() {
  for (let i = 0; i < 30; i++) {
    setTimeout(spawnHeart, i * 30);
  }
}

// Copy message
document.getElementById("copyBtn").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(shareText.value);
    document.getElementById("copyBtn").textContent = "Copied! ✅";
    setTimeout(
      () => (document.getElementById("copyBtn").textContent = "Copy message"),
      1400,
    );
  } catch {
    alert(
      "Copy didn’t work here — you can manually select the text and copy it 🙂",
    );
  }
});
