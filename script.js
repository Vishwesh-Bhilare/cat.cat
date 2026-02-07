const meowBtn = document.getElementById("meowBtn");
const spinBtn = document.getElementById("spinBtn");
const partyBtn = document.getElementById("partyBtn");
const laserBtn = document.getElementById("laserBtn");
const hatBtn = document.getElementById("hatBtn");
const rainbowBtn = document.getElementById("rainbowBtn");
const secretBtn = document.getElementById("secretBtn");
const catImg = document.getElementById("cat");
const counterText = document.getElementById("counter");
const thoughtBubble = document.getElementById("thought-bubble");
const energySpan = document.getElementById("energy");
const sillinessSpan = document.getElementById("silliness");
const funFact = document.getElementById("fun-fact");
const achievementList = document.getElementById("achievement-list");

let count = 0;
let rotation = 0;
let energy = 100;
let silliness = 0;
let isPartyMode = false;
let hasHat = false;
let secretClicks = 0;
let achievements = [];
let partyInterval;

const achievementTitles = [
  "First Meow!",
  "Spinning Cat",
  "Party Animal",
  "Laser Chaser",
  "Fashionable Cat",
  "Rainbow Master",
  "Cat Summoner Lvl 10",
  "Cat Summoner Lvl 50",
  "Sleepy Cat",
  "Secret Discovered"
];

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

const funFacts = [
  "Cats sleep for 70% of their lives!",
  "A group of cats is called a clowder.",
  "Cats have 32 muscles in each ear.",
  "The oldest cat lived to be 38 years old!",
  "Cats can't taste sweetness.",
  "A cat's purr may have healing properties.",
  "Cats have a third eyelid called a haw.",
  "Cats walk like camels and giraffes.",
  "Cats can jump up to 6 times their height!",
  "A cat's nose print is unique, like a human fingerprint.",
  "Cats only meow to communicate with humans.",
  "Cats have 230 bones (humans have 206).",
  "Cats can run up to 30 miles per hour!",
  "The richest cat in the world had £7 million."
];

// Initialize achievements
function initAchievements() {
  achievementTitles.forEach((title, index) => {
    const div = document.createElement('div');
    div.className = 'achievement';
    div.id = `achievement-${index}`;
    div.textContent = title;
    div.title = "Locked 🔒";
    achievementList.appendChild(div);
  });
  updateAchievementCount();
}

function updateAchievementCount() {
  document.getElementById('achievement-count').textContent = `${achievements.length}/${achievementTitles.length}`;
}

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

function randomThought() {
  const thoughts = ["😴", "😾", "😺", "😼", "😻", "🙀", "😹", "🍣", "🐟", "🐭", "❤️", "✨", "🌟", "🎮", "🍕"];
  thoughtBubble.textContent = thoughts[Math.floor(Math.random() * thoughts.length)];
  thoughtBubble.style.transform = `scale(${1 + Math.random() * 0.5}) rotate(${Math.random() * 20 - 10}deg)`;
  
  // Random color
  const colors = ['#FFB6C1', '#87CEEB', '#98FB98', '#FFD700', '#DDA0DD', '#FFA07A'];
  thoughtBubble.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
}

function updateStats() {
  energySpan.textContent = `${Math.round(energy)}%`;
  sillinessSpan.textContent = `${Math.round(silliness)}%`;
  
  if (energy < 30) {
    energySpan.style.color = '#ff6b6b';
    energySpan.style.textShadow = '0 0 10px #ff6b6b';
  } else if (energy < 70) {
    energySpan.style.color = '#ffd166';
    energySpan.style.textShadow = '0 0 10px #ffd166';
  } else {
    energySpan.style.color = '#06d6a0';
    energySpan.style.textShadow = '0 0 10px #06d6a0';
  }
  
  const hue = Math.min(120, silliness * 1.2);
  sillinessSpan.style.color = `hsl(${hue}, 100%, 60%)`;
  sillinessSpan.style.textShadow = `0 0 10px hsl(${hue}, 100%, 60%)`;
}

function updateFunFact() {
  funFact.textContent = funFacts[Math.floor(Math.random() * funFacts.length)];
  funFact.style.transform = 'scale(1.05)';
  funFact.style.opacity = '1';
  setTimeout(() => {
    funFact.style.transform = 'scale(1)';
    setTimeout(() => {
      funFact.style.opacity = '0.7';
    }, 200);
  }, 300);
}

function unlockAchievement(index) {
  if (!achievements.includes(index)) {
    achievements.push(index);
    const achievementDiv = document.getElementById(`achievement-${index}`);
    achievementDiv.classList.add('unlocked');
    achievementDiv.title = "Unlocked! 🎉";
    
    updateAchievementCount();
    
    // Confetti effect
    createConfetti();
    
    // Play achievement sound if available
    const achievementSound = new Audio();
    achievementSound.volume = 0.7;
    // You could add an achievement sound file here
    
    // Show notification
    showNotification(`Achievement Unlocked: ${achievementTitles[index]}!`);
  }
}

function createConfetti() {
  const confettiCount = 75;
  const confettiTypes = ['🎉', '🎊', '🏆', '⭐', '🎈', '✨', '🐱', '🎯'];
  
  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.textContent = confettiTypes[Math.floor(Math.random() * confettiTypes.length)];
      confetti.style.position = 'fixed';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-50px';
      confetti.style.fontSize = (15 + Math.random() * 25) + 'px';
      confetti.style.zIndex = '1000';
      confetti.style.pointerEvents = 'none';
      confetti.style.userSelect = 'none';
      document.body.appendChild(confetti);
      
      // Animate confetti falling
      const animation = confetti.animate([
        { 
          transform: `translateY(0px) rotate(0deg) scale(1)`, 
          opacity: 1 
        },
        { 
          transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg) scale(0.5)`, 
          opacity: 0 
        }
      ], {
        duration: 1500 + Math.random() * 1500,
        easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
      });
      
      animation.onfinish = () => confetti.remove();
    }, i * 20);
  }
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.position = 'fixed';
  notification.style.top = '20px';
  notification.style.right = '20px';
  notification.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  notification.style.color = 'white';
  notification.style.padding = '15px 25px';
  notification.style.borderRadius = '10px';
  notification.style.zIndex = '10000';
  notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
  notification.style.fontWeight = 'bold';
  notification.style.transform = 'translateX(150%)';
  notification.style.transition = 'transform 0.3s ease-out';
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 10);
  
  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = 'translateX(150%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

function startPartyMode() {
  isPartyMode = true;
  document.body.classList.add('party-mode');
  partyBtn.innerHTML = '<i class="fas fa-stop"></i> STOP PARTY';
  
  // Animated background
  let hue = 0;
  partyInterval = setInterval(() => {
    hue = (hue + 2) % 360;
    document.body.style.background = `linear-gradient(45deg, 
      hsl(${hue}, 100%, 50%), 
      hsl(${(hue + 90) % 360}, 100%, 50%), 
      hsl(${(hue + 180) % 360}, 100%, 50%), 
      hsl(${(hue + 270) % 360}, 100%, 50%))`;
    document.body.style.backgroundSize = '400% 400%';
    
    // Make cat dance
    const danceX = Math.sin(Date.now() / 200) * 20;
    const danceY = Math.cos(Date.now() / 300) * 10;
    catImg.style.transform = `translate(${danceX}px, ${danceY}px) rotate(${rotation}deg)`;
  }, 50);
  
  // Random meows during party
  const partyMeowInterval = setInterval(() => {
    if (!isPartyMode) {
      clearInterval(partyMeowInterval);
      return;
    }
    if (Math.random() < 0.3) {
      playMeow();
    }
  }, 1000);
  
  // Store interval ID for cleanup
  partyBtn.dataset.meowInterval = partyMeowInterval;
  
  unlockAchievement(2);
  silliness = Math.min(100, silliness + 20);
  updateStats();
}

function stopPartyMode() {
  isPartyMode = false;
  document.body.classList.remove('party-mode');
  partyBtn.innerHTML = '<i class="fas fa-party-horn"></i> PARTY MODE';
  document.body.style.background = '#111';
  catImg.style.transform = `rotate(${rotation}deg)`;
  
  if (partyInterval) {
    clearInterval(partyInterval);
  }
  
  const meowInterval = partyBtn.dataset.meowInterval;
  if (meowInterval) {
    clearInterval(meowInterval);
  }
}

// Event Listeners
meowBtn.addEventListener("click", () => {
  count++;
  counterText.textContent = `you have summoned the cat ${count} times`;
  playMeow();
  randomCat();
  
  // Update stats
  energy = Math.max(0, energy - 1);
  silliness = Math.min(100, silliness + 1);
  updateStats();
  
  // Random special effects
  if (Math.random() < 0.15) {
    catImg.classList.add('bounce');
    setTimeout(() => catImg.classList.remove('bounce'), 800);
  }
  
  randomThought();
  
  // Unlock achievements
  if (count === 1) unlockAchievement(0);
  if (count === 10) unlockAchievement(6);
  if (count === 50) unlockAchievement(7);
  
  // Occasionally update fun fact
  if (Math.random() < 0.25) {
    updateFunFact();
  }
  
  // Very rare mega meow
  if (Math.random() < 0.01) {
    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => playMeow(), i * 150);
      }
      showNotification("MEGA MEOW CHAIN! 🐱🎶");
    }, 200);
  }
});

spinBtn.addEventListener("click", () => {
  rotation += 360;
  catImg.style.transform = `rotate(${rotation}deg)`;
  
  energy = Math.max(0, energy - 3);
  silliness = Math.min(100, silliness + 3);
  updateStats();
  randomThought();
  unlockAchievement(1);
  
  // Spin sound effect
  const spinSound = new Audio();
  spinSound.volume = 0.5;
  // You could add a spin sound file here
});

partyBtn.addEventListener("click", () => {
  if (isPartyMode) {
    stopPartyMode();
  } else {
    startPartyMode();
  }
});

laserBtn.addEventListener("click", () => {
  // Create laser dot
  const laser = document.createElement('div');
  laser.className = 'laser-dot';
  laser.style.position = 'fixed';
  laser.style.width = '25px';
  laser.style.height = '25px';
  laser.style.background = 'radial-gradient(circle, #ff0000, #ff4444, transparent 70%)';
  laser.style.borderRadius = '50%';
  laser.style.boxShadow = '0 0 30px 15px rgba(255, 0, 0, 0.7)';
  laser.style.zIndex = '1000';
  laser.style.pointerEvents = 'none';
  laser.style.left = Math.random() * 70 + 15 + '%';
  laser.style.top = Math.random() * 70 + 15 + '%';
  document.body.appendChild(laser);
  
  // Cat looks at laser
  const rect = catImg.getBoundingClientRect();
  const laserX = parseFloat(laser.style.left);
  const laserY = parseFloat(laser.style.top);
  
  const deltaX = (laserX / 100 * window.innerWidth) - (rect.left + rect.width / 2);
  const deltaY = (laserY / 100 * window.innerHeight) - (rect.top + rect.height / 2);
  
  const lookAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  catImg.style.transform = `rotate(${lookAngle}deg)`;
  
  // Create laser beam
  const beam = document.createElement('div');
  beam.style.position = 'fixed';
  beam.style.left = '50%';
  beam.style.bottom = '50px';
  beam.style.width = '5px';
  beam.style.height = '0';
  beam.style.background = 'linear-gradient(to top, rgba(255,0,0,0), rgba(255,0,0,0.8))';
  beam.style.transformOrigin = 'bottom center';
  beam.style.transform = `rotate(${lookAngle}deg)`;
  beam.style.zIndex = '999';
  document.body.appendChild(beam);
  
  // Animate beam
  beam.animate([
    { height: '0', opacity: 1 },
    { height: `${Math.sqrt(deltaX * deltaX + deltaY * deltaY)}px`, opacity: 0.8 },
    { height: '0', opacity: 0 }
  ], {
    duration: 800,
    easing: 'ease-out'
  });
  
  // Remove elements
  setTimeout(() => {
    laser.remove();
    beam.remove();
    catImg.style.transform = `rotate(${rotation}deg)`;
  }, 1000);
  
  energy = Math.max(0, energy - 8);
  silliness = Math.min(100, silliness + 5);
  updateStats();
  randomThought();
  unlockAchievement(3);
});

hatBtn.addEventListener("click", () => {
  const catContainer = document.getElementById('cat-container');
  hasHat = !hasHat;
  
  if (hasHat) {
    catContainer.classList.add('cat-hat');
    hatBtn.textContent = '👑 Remove Hat';
    hatBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    
    // Random hat type
    const hats = ['🎩', '👑', '🎓', '🧢', '⛑️', '🎪', '🧙'];
    catContainer.dataset.hat = hats[Math.floor(Math.random() * hats.length)];
    
    silliness = Math.min(100, silliness + 15);
    unlockAchievement(4);
  } else {
    catContainer.classList.remove('cat-hat');
    hatBtn.textContent = '🎩 Give Hat';
    hatBtn.style.background = '#4caf50';
  }
  
  updateStats();
  randomThought();
});

rainbowBtn.addEventListener("click", () => {
  catImg.classList.add('bounce');
  
  // Rainbow effect on cat
  let hue = 0;
  const rainbowInterval = setInterval(() => {
    hue = (hue + 10) % 360;
    catImg.style.filter = `hue-rotate(${hue}deg) saturate(2) brightness(1.1)`;
  }, 100);
  
  // Also rainbow background
  document.body.style.background = `linear-gradient(45deg, 
    #ff0000, #ff9900, #ffff00, #00ff00, #0099ff, #6633ff)`;
  document.body.style.backgroundSize = '400% 400%';
  
  // Animate background
  let pos = 0;
  const bgInterval = setInterval(() => {
    pos = (pos + 1) % 100;
    document.body.style.backgroundPosition = `${pos}% ${pos}%`;
  }, 50);
  
  setTimeout(() => {
    clearInterval(rainbowInterval);
    clearInterval(bgInterval);
    catImg.classList.remove('bounce');
    catImg.style.filter = '';
    document.body.style.background = '#111';
    document.body.style.backgroundPosition = '';
  }, 3000);
  
  silliness = Math.min(100, silliness + 20);
  updateStats();
  randomThought();
  unlockAchievement(5);
});

secretBtn.addEventListener("click", () => {
  secretClicks++;
  
  // Different effects based on click count
  switch(secretClicks) {
    case 1:
      secretBtn.textContent = 'Shh...';
      break;
    case 2:
      secretBtn.textContent = 'Keep going...';
      break;
    case 3:
      secretBtn.textContent = 'Almost...';
      break;
    case 4:
      secretBtn.textContent = 'One more...';
      break;
    case 5:
      secretBtn.textContent = 'NEKO MODE!';
      secretBtn.style.animation = 'rainbowText 1s infinite';
      document.body.style.background = 'pink';
      
      // Make all text Japanese-themed for a moment
      document.querySelectorAll('*').forEach(el => {
        const original = el.textContent;
        el.dataset.originalText = original;
        el.textContent = original.replace(/cat/gi, 'ネコ').replace(/meow/gi, 'にゃあ');
      });
      
      // Cat becomes anime
      catImg.style.filter = 'brightness(1.3) saturate(2) contrast(1.2)';
      catImg.style.transform = 'scale(1.1)';
      
      setTimeout(() => {
        document.body.style.background = '#111';
        catImg.style.filter = '';
        catImg.style.transform = `rotate(${rotation}deg)`;
        document.querySelectorAll('*').forEach(el => {
          if (el.dataset.originalText) {
            el.textContent = el.dataset.originalText;
          }
        });
      }, 5000);
      
      unlockAchievement(9);
      break;
    case 10:
      secretBtn.textContent = 'SUPER CAT!';
      // Transform cat
      catImg.style.filter = 'invert(1) hue-rotate(180deg)';
      catImg.style.boxShadow = '0 0 50px gold';
      
      // Play epic music if available
      const epicSound = new Audio();
      epicSound.volume = 0.7;
      
      setTimeout(() => {
        catImg.style.filter = '';
        catImg.style.boxShadow = '';
      }, 3000);
      break;
    case 15:
      secretBtn.textContent = 'MAX SILLY';
      silliness = 100;
      energy = 100;
      updateStats();
      
      // Extreme effects
      catImg.style.animation = 'bounce 0.3s infinite, partyLights 0.5s infinite';
      document.body.style.animation = 'partyLights 0.2s infinite';
      
      setTimeout(() => {
        catImg.style.animation = '';
        document.body.style.animation = '';
      }, 5000);
      break;
  }
  
  silliness = Math.min(100, silliness + 2);
  updateStats();
});

// Energy regeneration
setInterval(() => {
  if (energy < 100) {
    energy = Math.min(100, energy + 0.3);
    updateStats();
  }
  
  // Slowly decrease silliness when not interacting
  if (silliness > 0 && Math.random() < 0.1) {
    silliness = Math.max(0, silliness - 0.1);
    updateStats();
  }
  
  // Random cat thoughts
  if (Math.random() < 0.03) {
    randomThought();
  }
  
  // Sleepy cat when energy is low
  if (energy < 20 && !thoughtBubble.textContent.includes('😴')) {
    thoughtBubble.textContent = '😴';
    thoughtBubble.style.backgroundColor = '#87CEEB';
    unlockAchievement(8);
  }
  
  // Random fun fact
  if (Math.random() < 0.008) {
    updateFunFact();
  }
}, 1000);

// Initialize
initAchievements();
updateStats();
randomThought();
updateFunFact();

// Add some random fun on load
setTimeout(() => {
  if (Math.random() < 0.3) {
    showNotification("Welcome to Silly Cat Simulator! 🐱");
  }
}, 1000);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }
  
  if (konamiCode.join(',') === konamiSequence.join(',')) {
    // Activate super secret mode
    showNotification("KONAMI CODE ACTIVATED! MAXIMUM SILLINESS!");
    silliness = 100;
    energy = 100;
    count += 100;
    counterText.textContent = `you have summoned the cat ${count} times`;
    updateStats();
    
    // Unlock all achievements
    achievementTitles.forEach((_, index) => unlockAchievement(index));
    
    // Reset code
    konamiCode = [];
  }
});

// Easter egg: Click cat 10 times fast
let catClicks = 0;
let lastCatClick = 0;
catImg.addEventListener('click', () => {
  const now = Date.now();
  if (now - lastCatClick < 500) {
    catClicks++;
    if (catClicks >= 10) {
      showNotification("PAT PAT PAT! So much petting! 😻");
      catClicks = 0;
      
      // Heart explosion
      for (let i = 0; i < 30; i++) {
        setTimeout(() => {
          const heart = document.createElement('div');
          heart.textContent = '❤️';
          heart.style.position = 'fixed';
          heart.style.left = (catImg.getBoundingClientRect().left + catImg.width / 2) + 'px';
          heart.style.top = (catImg.getBoundingClientRect().top + catImg.height / 2) + 'px';
          heart.style.fontSize = '25px';
          heart.style.zIndex = '1000';
          heart.style.pointerEvents = 'none';
          document.body.appendChild(heart);
          
          heart.animate([
            { transform: 'translate(0,0) scale(1)', opacity: 1 },
            { 
              transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * -200 - 50}px) scale(0)`, 
              opacity: 0 
            }
          ], {
            duration: 1000 + Math.random() * 1000,
            easing: 'ease-out'
          });
          
          setTimeout(() => heart.remove(), 2000);
        }, i * 50);
      }
    }
  } else {
    catClicks = 1;
  }
  lastCatClick = now;
});

// Add CSS for rainbow text animation
const style = document.createElement('style');
style.textContent = `
  @keyframes rainbowText {
    0% { color: #ff0000; }
    17% { color: #ffff00; }
    34% { color: #00ff00; }
    51% { color: #00ffff; }
    68% { color: #0000ff; }
    85% { color: #ff00ff; }
    100% { color: #ff0000; }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
`;
document.head.appendChild(style);
