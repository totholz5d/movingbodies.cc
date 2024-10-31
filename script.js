
const wordList = [ "minimal",
  "simple",
  "elegant",
  "fast",
  "complexity",
  "slow",
  "bouncing",
  "rolling",
  "growing",
  "stretching",
  "melting",
  "shaking",
  "swirling",
  "floating",
  "falling",
  "space",
  "gravity",
  "ground",
  "wave",
  "chaos",
  "energy",
  "silence",
  "fire",
  "time",
  "slime",
  "infinite",
  "acceleration",
  "flow",
  "explosion",
  "breath",
  "rotation",
  "interaction",
  "concentration",
  "circulation",
  "transformation",
  "mutation",
  "vibration",
  "microscopic",
  "elastic",
  "heavy",
  "gigantic",
  "soft",
  "low",
  "open",
  "hot",
  "organic",
  "unstable",
  "loop",
  "fluid",
  "curved",
  "solid",
  "outrageous",
  "air",
  "tension",
  "messy",
  "wild",
  "hard",
  "furry",
  "fluffy",
  "stability",
  "elegant",
  "inwards",
  "outwards",
  "delicate",
  "juicy",
  "wiggling",
  "earth",
  "minimal",
  "high",
  "expansion",
  "touch",
  "rhythmic",
  "connection",
  "random",
  "intense",
  "full",
  "empty or emptiness",
  "sliding",
  "fusion",
  "oscilation",
  "spiral",
  "circle",
  "triangle",
  "sphere",
  "cube",
  "alive",
  "near",
  "distance",
  "balanced",
  "iterativ",
  "entangled",
  "structure"
];

function getRandomWords(list, count) {
  const shuffledList = list.slice().sort(() => Math.random() - 0.5);
  return shuffledList.slice(0, count);
}

function displayWords() {
  const wordElements = document.querySelectorAll('.word');
  const randomWords = getRandomWords(wordList, 3);
  wordElements.forEach((wordElement, index) => {
    wordElement.textContent = randomWords[index];
  });
}

// Call the displayWords function when the page loads
window.addEventListener('DOMContentLoaded', displayWords);

// Add click event listener to the refresh button
const refreshButton = document.querySelector('.refresh-button');
refreshButton.addEventListener('click', displayWords);