const assert = chai.assert;

describe("getPath()", () => {
    const checkArray = ['H1', 9, '', null];

    for (let i = 0; i < checkArray.length; i++) {
        it('должен вернуть полную строку пути для ' + checkArray[i], () => {
            assert.equal(getPath(checkArray[i]), 'assets/cards/' + checkArray[i] + '.png');
        });
    }
    it('должен вернуть полную строку пути для undefined', () => {
        assert.equal(getPath(), 'assets/cards/.png');
    });
});

describe("shuffleArray()", () => {
    it('должен вернуть массив для [1, 2, 3]', () => {
        assert.isArray(shuffleArray([1, 2, 3]));
    });
    it('должен вернуть array [] для ()', () => {
        assert.isArray(shuffleArray());
    });
    it('должен вернуть NaN для "string"', () => {
        assert(isNaN(shuffleArray("string")));
    });
    it('должен вернуть NaN для {object}', () => {
        assert(isNaN(shuffleArray({})));
    });
});

describe("getRandomArray()", () => {
    it('должен вернуть массив из 4х не повторяющихся элементов', () => {
        assert.isArray(getRandomArray(4, 8));
        assert.equal(getRandomArray(4, 8).length, 4, "размер массива не 4");
        let array = getRandomArray(4, 8);
        let tmpArray = [];
        array.forEach(item => {
            if (!tmpArray.includes(item))
                tmpArray.push(item);
        });
        assert.equal(array.length, tmpArray.length, "в массиве повторяющиеся числа");
    });
    it('должен вернуть null при (), (5,5), (5,2)', () => {
        assert.equal(getRandomArray(), null);
        assert.equal(getRandomArray(5, 5), null);
        assert.equal(getRandomArray(5, 2), null);
    });
    it('должен вернуть NaN при "string"', () => {
        assert(isNaN(getRandomArray('str1', 'str2')));
        assert(isNaN(getRandomArray('str1')));
        assert(isNaN(getRandomArray(4, '8')));
    });
});

describe("setScore()", () => {
    it('должен вернуть 184 при заданных данных', () => {
        assert.equal(setScore(100, scoreEnum.addScore, 2, 8), 184);
    });
    it('должен вернуть 16 при заданных данных', () => {
        assert.equal(setScore(100, scoreEnum.removeScore, 2), 16);
        assert.equal(setScore(100, "remove", 2, 8), 16);
    });
    it('должен вернуть 0 при ()', () => {
        assert.equal(setScore(), 0);
    });

});

// TODO: для запуска тестов раскомментить
//mocha.run();