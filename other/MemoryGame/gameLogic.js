const endPage = document.getElementById('endPage');
const gamePage = document.getElementById('gamePage');
const startPage = document.getElementById('startPage');

const gameTableElem = document.getElementById('gameTable');
let scoreElements = document.getElementsByClassName('score');
const imagesList = gameTableElem.querySelectorAll('img');
const newGameButtons = document.getElementsByClassName('newGame');
const scoreEnum = {
    addScore: "add",
    removeScore: "remove"
};
const cardsNameList = [
    "0C", "0D", "0H", "0S",
    "2C", "2D", "2H", "2S",
    "3C", "3D", "3H", "3S",
    "4C", "4D", "4H", "4S",
    "5C", "5D", "5H", "5S",
    "6C", "6D", "6H", "6S",
    "7C", "7D", "7H", "7S",
    "8C", "8D", "8H", "8S",
    "9C", "9D", "9H", "9S",
    "AC", "AD", "AH", "AS",
    "JC", "JD", "JH", "JS",
    "KC", "KD", "KH", "KS",
    "QC", "QD", "QH", "QS",
];
let openCardsCount = 0,
    score = 0,
    isFirstClicked = false,
    wait = false,
    cardFirst;

gameTableElem.onclick = (event) => {
    let target = event.target;

    if (wait ||
        target.tagName !== 'IMG' ||
        target.parentElement.classList.contains('collapse')) return false;

    if (!isFirstClicked) { // если первая карта еще не выбрана
        flipCard(target); // переворот первой карты
        cardFirst = target; // запоминание первой карты
        return false;
    }

    if (cardFirst.src === target.src) { // правильная пара
        if (!target.classList.contains('hide')) { // отмена двойного клика по выбранной карте
            return false;
        }
        openCardsCount++;
        score = setScore(score, scoreEnum.addScore, openCardsCount, imagesList.length);
        hideDoubleCards(target, cardFirst); // скрыть отгаданную пару карт

        if (openCardsCount >= imagesList.length / 2) { // проверка на выигрыш
            setTimeout(() => {
                gamePage.classList.toggle('noDisplaying');
                endPage.classList.remove('noDisplaying');
                scoreElements[1].innerHTML = score.toString();
                wait = false;
            }, 1000);
        }
    } else { // неправильная пара
        score = setScore(score, scoreEnum.removeScore, openCardsCount);
        setTimeout(() => {
            changeCardVisible(target); // переворот карты 1
            changeCardVisible(cardFirst); // переворот карты 2
            target.dataset.tid = 'Card';
            cardFirst.dataset.tid = 'Card';
            cardFirst = ''; // сброс первой карты
            wait = false;
        }, 1000);
    }
    wait = true;
    flipCard(target); // переворот карты 2
    scoreElements[0].innerHTML = score.toString();
};

for (let i = 0; i < newGameButtons.length; i++) {
    newGameButtons[i].onclick = newGame; // добавление обработчика всем кнопкам запуска новой игры
}

function newGame() {
    if (wait) return false;

    if (this.tagName !== 'TD') {
        gamePage.classList.toggle('noDisplaying');
        endPage.classList.add('noDisplaying');
        startPage.classList.add('noDisplaying');
    }
    openCardsCount = 0;
    score = 0;
    scoreElements[0].innerHTML = score.toString();

    wait = true;

    getRandomCards(imagesList, cardsNameList);
    showAllCards(imagesList);
    flipAllCards(imagesList); // перевернуть все карты рубашкой вверх после 5сек
}

function setScore(score = 0, Enum, openCards = 0, cardsListLength = 0) {
    const coefficient = 42;

    if (cardsListLength < 0) return score;

    switch (Enum) {
        case "add":
            score += ((cardsListLength / 2) - openCards) * coefficient; // общее количество карт - число открытых карт * коэффициент
            break;
        case "remove":
            score -= openCards * coefficient; // число открытых карт * коэффициент
            break;
        default:
            console.log('incorrect enum');
            break;
    }
    return score;
}

function flipCard(target) {
    changeCardVisible(target); // переворот карты
    target.dataset.tid = 'Card-flipped';
    isFirstClicked = !isFirstClicked;
}

function changeCardVisible(card) {
    card.classList.toggle('hide');
    card.parentElement.classList.toggle('flipBack');
}

function hideDoubleCards(card1, card2) {
    setTimeout(() => {
        card1.parentElement.classList.toggle('collapse');
        card2.parentElement.classList.toggle('collapse');
        card1.parentElement.classList.toggle('flipBack');
        card2.parentElement.classList.toggle('flipBack');
        wait = false;
    }, 500);
}

function flipAllCards(cardsList, time = 5000) {
    setTimeout(() => {
        for (let i = 0; i < cardsList.length; i++) {
            cardsList[i].classList.toggle('hide');
            cardsList[i].parentElement.classList.toggle('flipBack');
        }
        wait = false;
    }, time);
}

function showAllCards(cardsList) {
    for (let i = 0; i < cardsList.length; i++) {
        cardsList[i].classList.remove('hide');
        cardsList[i].parentElement.classList.remove('collapse');
        cardsList[i].parentElement.classList.toggle('flipBack');
    }
}

function getRandomCards(cardsList, pathList) {
    let array = getRandomArray(9, pathList.length); // получение рандомного массива
    let arrayCopy = array.slice(0); // получение копии массива
    let fullArray = shuffleArray(array.concat(arrayCopy)); // соединение двух массивов и перемешивание

    for (let i = 0; i < fullArray.length; i++) {
        let cardsListIndex = fullArray[i];
        cardsList[i].src = getPath(pathList[cardsListIndex]);
        cardsList[i].classList.add('card');
        cardsList[i].dataset.tid = 'Card';
    }
}

function getPath(name = '') {
    return "assets/cards/" + name + ".png";
}

function getRandomArray(length = 0, max = 0) {
    if (length >= max) return null;
    if (typeof length === 'string' || typeof max === 'string') return NaN;

    let current, array = [];

    while (array.length !== length) {
        current = Math.floor(Math.random() * max);
        if (!array.includes(current)) {
            array.push(current);
        }
    }
    return array;
}

function shuffleArray(array = []) {
    if (!Array.isArray(array)) return NaN;

    let currentIndex = array.length, tempValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        tempValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tempValue;
    }
    return array;
}