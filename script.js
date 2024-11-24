// Get the current language from the URL path
const lang = window.location.pathname.includes('/fr') ? 'fr' : 'en';

let words = [];  // Full word list
let currentDeck = [];  // Current shuffled deck

// Update the fetch path to use language-specific wordlist
fetch(`wordlist_${lang}.txt`)
    .then(response => {
        console.log('Fetched file path:', response.url);
        return response.text();
    })
    .then(wordList => {
        words = wordList
            .trim()
            .split('\n')
            .filter(Boolean);  // Removes empty lines
        
        // Initialize the shuffled deck
        currentDeck = [...words];
        shuffleDeck();
        
        // Initialize the display after words are loaded
        displayWords();
        setupModal();
        setupRefreshButton();
    })
    .catch(error => {
        console.error('Error reading file:', error.message);
    });

function shuffleDeck() {
    for (let i = currentDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [currentDeck[i], currentDeck[j]] = [currentDeck[j], currentDeck[i]];
    }
}

function getRandomWords(count) {
    // If we don't have enough words left, reshuffle
    if (currentDeck.length < count) {
        currentDeck = [...words];
        shuffleDeck();
    }
    return currentDeck.splice(0, count);
}

function createCard(word) {
    const card = document.createElement('div');
    card.className = 'card';
    card.textContent = word;
    card.draggable = true;

    card.addEventListener('click', () => {
        const newWord = getRandomWords(1)[0];
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

function displayWords() {
    const container = document.getElementById('cardsContainer');
    container.innerHTML = '';

    const count = Math.floor(Math.random() * 2) + 2;  // 2 or 3 words
    const selectedWords = getRandomWords(count);
    selectedWords.forEach(word => {
        container.appendChild(createCard(word));
    });
}

function setupRefreshButton() {
    const refreshButton = document.querySelector('.refresh-button');
    refreshButton.addEventListener('click', displayWords);
}

const container = document.getElementById('cardsContainer');
container.addEventListener('dragover', handleDragOver);

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

function setupModal() {
    const modal = document.getElementById('helpModal');
    const modalBtn = document.querySelector('.modal-button');
    const closeBtn = document.querySelector('.close-modal');

    modal.style.display = 'none';

    modalBtn.onclick = () => {
        modal.style.display = 'block';
    };

    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}