const endPage = document.getElementById('endPage');
const gamePage = document.getElementById('gamePage');
const startPage = document.getElementById('startPage');

const gameTableElem = document.getElementById('gameTable');
let scoreElements = document.getElementsByClassName('score');
const imagesList = gameTableElem.querySelectorAll('img');
const newGameButtons = document.getElementsByClassName('newGame');

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

    if (target.tagName !== 'IMG' || wait || target.parentElement.classList.contains('collapse')) return false;

    if (!isFirstClicked) { // first card click
        changeCardVisible(target); // show card
        isFirstClicked = !isFirstClicked;
        cardFirst = target;
        return false;
    }

    if (cardFirst.src === target.src) { // correct card
        if (!target.classList.contains('hide')) { // double click!
            return false;
        }
        openCardsCount += 1;
        score += (9 - openCardsCount) * 42;
        hideDoubleCards(target, cardFirst);

        if (openCardsCount >= 9) { // win check
            setTimeout(function () { // todo: to css transition time
                gamePage.classList.toggle('notDisplaying');
                endPage.classList.toggle('notDisplaying');
                gameTableElem.classList.toggle('hide');
                scoreElements[1].innerHTML = score.toString();
                wait = false;
            }, 1000);
        }
    } else { // incorrect card
        score -= openCardsCount * 42;
        setTimeout(function () {
            changeCardVisible(target);
            changeCardVisible(cardFirst);
            cardFirst = '';
            wait = false;
        }, 500);
    }
    wait = true;
    changeCardVisible(target);
    isFirstClicked = !isFirstClicked;
    scoreElements[0].innerHTML = score.toString();
};

for (let i = 0; i < newGameButtons.length; i++) {
    newGameButtons[i].onclick = newGame; // adding newGameButtons click handle
}

function newGame() {
    if (wait) return false;

    if (this.parentNode.tagName !== 'TR') {
        gamePage.classList.toggle('notDisplaying');
        startPage.classList.toggle('notDisplaying');
        gameTableElem.classList.toggle('hide');

    }
    openCardsCount = 0;
    score = 0;
    scoreElements[0].innerHTML = score.toString();

    wait = true;

    getRandomCards(imagesList, cardsNameList);
    showAllCards(imagesList);
    hideAllCards(imagesList); // hide after 5 sec
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

function hideAllCards(cardsList, time = 5000) {
    setTimeout(() => {
        cardsList.forEach(card => {
            card.classList.toggle('hide');
            card.parentElement.classList.toggle('flipBack');
        });
        wait = false;
    }, time); // default 5 sec
}

function showAllCards(cardsList) {
    cardsList.forEach(card => {
        card.classList.remove('hide');
        card.parentElement.classList.remove('collapse');
        card.parentElement.classList.toggle('flipBack');
    });
}

function getRandomCards(cardsList, pathList) {
    let array = getRandomArray(9, pathList.length);
    let fullArray = shuffleArray(array.concat(array.slice(0))); // create copy -> connect -> shuffle

    for (let i = 0; i < fullArray.length; i++) {
        let cardsListIndex = fullArray[i];
        cardsList[i].src = getPath(pathList[cardsListIndex]);
        cardsList[i].classList.add('card');
    }
}

function getPath(name) {
    return "assets/cards/" + name + ".png";
}

function getRandomArray(length, max) {
    let current, array = [];

    while (array.length !== length) {
        current = Math.floor(Math.random() * max);
        if (!array.includes(current)) {
            array.push(current);
        }
    }
    return array;
}

function shuffleArray(array) {
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