const meowBtn = document.getElementById("meowBtn");
const spinBtn = document.getElementById("spinBtn");
const catImg = document.getElementById("cat");
const counterText = document.getElementById("counter");

let count = 0;
let rotation = 0;

const meows = [
  "meow/meow1.mp3",
  "meow/meow2.mp3",
  "meow/meow3.mp3",
  "meow/meow4.mp3"
];

const cats = [
  "cats/cat1.jpg",
  "cats/cat2.jpg",
  "cats/cat3.jpg",
  "cats/cat4.jpg"
];

function playMeow() {
  const sound = new Audio(
    meows[Math.floor(Math.random() * meows.length)]
  );

  sound.volume = 1.0;
  sound.play();

  // 20% chance of double meow
  if (Math.random() < 0.2) {
    setTimeout(() => {
      const sound2 = new Audio(
        meows[Math.floor(Math.random() * meows.length)]
      );
      sound2.volume = 1.0;
      sound2.play();
    }, 120);
  }
}

function randomCat() {
  catImg.src = cats[Math.floor(Math.random() * cats.length)];
}

meowBtn.addEventListener("click", () => {
  count++;
  counterText.textContent = `you have summoned the cat ${count} times`;
  playMeow();
  randomCat();
});

spinBtn.addEventListener("click", () => {
  rotation += 360;
  catImg.style.transform = `rotate(${rotation}deg)`;
});
