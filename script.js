
const wordList = ["minimal",
            "elegant",
            "complexity",
            "slow",
            "bouncing",
            "rolling",
            "growing",
            "stretching",
            "melting",
            "shaking",
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
            "circulation",
            "mutation",
            "vibration",
            "microscopic",
            "elastic",
            "gigantic",
            "quick",
            "jelly",
            "soft",
            "low",
            "wide",
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
            "furry",
            "stability",
            "inwards",
            "outwards",
            "delicate",
            "juicy",
            "wiggling",
            "expansion",
            "touch",
            "rhythmic",
            "random",
            "sliding",
            "oscilation",
            "spiral",
            "equilibrium",
            "circle",
            "triangle",
            "sphere",
            "remote",
            "entangled",
            "structure",
            "tingling", 
            "pulsating", 
            "rippling", 
            "weightless", 
            "sharp", 
            "smooth", 
            "core", 
            "magnetic", 
            "sticky", 
            "shadow", 
            "echo", 
            "fierce", 
            "burning", 
            "swift"
            "layered", 
            "suspended", 
            "compressed", 
            "folding", 
            "continuous", 
            "parallel", 
            "impact", 
            "saturated", 
            "cascading", 
            "grainy", 
            "porous", 
            "diffusion", 
            "tingling",
            "pulsating",
            "rippling",
            "weightless",
            "sharp",
            "smooth",
            "rough",
            "magnetic",
            "sticky",
            "shadow",
            "echo",
            "fierce",
            "burning",
            "swift",
            "layered",
            "suspended",
            "compressed",
            "folding",
            "continuous",
            "parallel",
            "impact",
            "saturated",
            "cascading",
            "grainy",
            "porous",
            "diffusion",
            "viscous",
            "almost",
            "nearby",
            "narrow",
            "texture",
            "sponge",
            "mollusk-like",
            "absorption",
            "imminent",
            "thick",
            "dense",
            "gradual",
            "sudden",
            "endless",
            "intermitent",
            "perpetual",
            "effortless",
            "graceful",
            "elegance",
            "power",
            "gentle",
            "diagonal",
            "periphery",
            "central",
            "center",
            "expansive",
            "infinitesimal",
            "mysterious",
            "luxurious",
            "precious",
            "harmonious"
  ];

function getRandomWords(list, count) {

    
    // Make a copy to avoid modifying original array
    const array = [...list];
    
    // Fisher-Yates shuffle, but only up to count elements we need
    for (let i = 0; i < count; i++) {
        const j = i + Math.floor(Math.random() * (array.length - i));
        [array[i], array[j]] = [array[j], array[i]];
    }
    
    return array.slice(0, count);
}

        function createCard(word) {
            const card = document.createElement('div');
            card.className = 'card';
            card.textContent = word;
            card.draggable = true;
            
 
            card.addEventListener('click', () => {
                // Get a new random word from the list, excluding the current word
                const newWord = getRandomWords(
                    wordList.filter(w => w !== card.textContent), 
                    1
                )[0];
                card.textContent = newWord;
            });


            card.addEventListener('dragstart', (e) => {
                card.classList.add('dragging');
            });
            
            card.addEventListener('dragend', (e) => {
                card.classList.remove('dragging');
            });
            
            return card;
        }

        function handleDragOver(e) {
            e.preventDefault();
            const container = document.getElementById('cardsContainer');
            const draggingCard = container.querySelector('.dragging');
            const cards = [...container.querySelectorAll('.card:not(.dragging)')];
            
            const afterCard = cards.reduce((closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = e.clientX - (box.left + box.width / 2);
                
                if (offset < 0 && offset > closest.offset) {
                    return { offset, element: child };
                } else {
                    return closest;
                }
            }, { offset: Number.NEGATIVE_INFINITY }).element;

            if (afterCard) {
                container.insertBefore(draggingCard, afterCard);
            } else {
                container.appendChild(draggingCard);
            }
        }

        function displayWords() {
            const container = document.getElementById('cardsContainer');
            container.innerHTML = '';
            
            const words = getRandomWords(wordList, (Math.floor(Math.random() * 2) + 2));
            words.forEach(word => {
                container.appendChild(createCard(word));
            });
        }

        function refreshWords() {
            displayWords();
        }

        // Initialize drag and drop handling
        const container = document.getElementById('cardsContainer');
        container.addEventListener('dragover', handleDragOver);

        // Display initial words
        displayWords();
