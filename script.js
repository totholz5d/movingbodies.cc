
// Get the current language from the URL path
const lang = window.location.pathname.includes('/fr') ? 'fr' : 'en';

let words = [];  // Declare words globally

// Update the fetch path to use language-specific wordlist
<<<<<<< Updated upstream
fetch(`/words/wordList_${lang}.txt`)
=======
fetch(`./words/wordList_${lang}.txt`)
>>>>>>> Stashed changes
    .then(response => response.text())
    .then(wordList => {
        words = wordList
            .trim()
            .split('\n')
            .filter(Boolean);  // Removes empty lines
        
        // Initialize the display after words are loaded
        displayWords();
    })
    .catch(error => {
        console.error('Error reading file:', error.message);
    });

function getRandomWords(list, count) {
    const array = [...list];
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
        const newWord = getRandomWords(
            words.filter(w => w !== card.textContent),
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

    const selectedWords = getRandomWords(words, (Math.floor(Math.random() * 2) + 2));
    selectedWords.forEach(word => {
        container.appendChild(createCard(word));
    });
}

function refreshWords() {
    displayWords();
}

const container = document.getElementById('cardsContainer');
container.addEventListener('dragover', handleDragOver);

// Remove this line since we'll call displayWords() after fetching the words
// displayWords();