// zmienne

const closeChooseGtComponent = document.getElementById('closeSetPrices');
const chooseGtComponent = document.querySelector('.prices__choose-gt');
const closeSetPrice = document.getElementById('closeSetPrice');
const setPriceComponent = document.querySelector('.prices__insert');
const openChooseGtComponent = document.querySelector('.prices__add-btn');
const allGtBtns = [...document.querySelectorAll('.prices__gt-btn')];
const calculateBtn = document.getElementById('calculateBtn');
const changePirecesBtn = document.getElementById('changeBasePrice');
let localPriceDb;

// koniec zmienne


closeChooseGtComponent.addEventListener('click', () => chooseGtComponent.style.display = 'none');

closeSetPrice.addEventListener('click', () => setPriceComponent.style.display = 'none');

openChooseGtComponent.addEventListener('click', () => chooseGtComponent.style.display = 'flex');

// pobieranie bazy zapisanych cen
if (!window.localStorage.getItem('ofertomatPrices')) {
    localPriceDb = [{
        name: 'c11',
        2021: '0',
        2022: '0',
        2023: '0',
        2024: '0',
        2025: '0',
        2026: '0'
    }];
    updateLocalDb(localPriceDb);
} else {
    getLocalDb();
}


// koniec pobieranie bazy zapisanych cen

const replaceAndParseMainFn = (item) => {
    return parseFloat(item.replace(/\,/g, '.'));
};

function updateLocalDb(db) {
    window.localStorage.setItem('ofertomatPrices', JSON.stringify(db))
    localPriceDb = db;
};

function getLocalDb() {
    localPriceDb = JSON.parse(window.localStorage.getItem('ofertomatPrices'));
}

function changePrices() {
    const gt = setPriceComponent.children[1].innerText;
    const year = document.getElementById('chooseYear').value;
    const priceFirst = document.getElementById('basePriceFirst');
    const priceSecond = document.getElementById('basePriceSecond');
    const priceThird = document.getElementById('basePriceThird');
    const actualInDb = localPriceDb.find(priceObject => priceObject.name === gt.toLowerCase());
    switch (gt[2]) {
        case '1':
            if (actualInDb) {
                const baseWithoutThisGt = localPriceDb.filter(obj => obj.name !== gt.toLowerCase());
                for (const yearInDb in actualInDb) {
                    if (yearInDb === year) actualInDb[yearInDb] = priceFirst.value;
                }
                const newDb = [...baseWithoutThisGt, ...[actualInDb]];
                updateLocalDb(newDb);
            } else {
                const newPriceObject = {
                    name: gt.toLowerCase(),
                    2021: '0',
                    2022: '0',
                    2023: '0',
                    2024: '0',
                    2025: '0',
                    2026: '0'
                };
                for (const yearInDb in newPriceObject) {
                    if (yearInDb === year) newPriceObject[yearInDb] = priceFirst.value;
                };
                const newDb = [...localPriceDb, ...[newPriceObject]];
                updateLocalDb(newDb);
            }
            break;
        case '2':
            if (actualInDb) {
                const baseWithoutThisGt = localPriceDb.filter(obj => obj.name !== gt.toLowerCase());
                for (const yearInDb in actualInDb) {
                    if (yearInDb === year) actualInDb[yearInDb] = [priceFirst.value, priceSecond.value];
                }
                const newDb = [...baseWithoutThisGt, ...[actualInDb]];
                updateLocalDb(newDb);
            } else {
                const newPriceObject = {
                    name: gt.toLowerCase(),
                    2021: ['0', '0'],
                    2022: ['0', '0'],
                    2023: ['0', '0'],
                    2024: ['0', '0'],
                    2025: ['0', '0'],
                    2026: ['0', '0']
                };
                for (const yearInDb in newPriceObject) {
                    if (yearInDb === year) newPriceObject[yearInDb] = [priceFirst.value, priceSecond.value];
                };
                const newDb = [...localPriceDb, ...[newPriceObject]];
                updateLocalDb(newDb);
            }
            break;

        default:
            if (actualInDb) {
                const baseWithoutThisGt = localPriceDb.filter(obj => obj.name !== gt.toLowerCase());
                for (const yearInDb in actualInDb) {
                    if (yearInDb === year) actualInDb[yearInDb] = [priceFirst.value, priceSecond.value, priceThird.value];
                }
                const newDb = [...baseWithoutThisGt, ...[actualInDb]];
                updateLocalDb(newDb);
            } else {
                const newPriceObject = {
                    name: gt.toLowerCase(),
                    2021: ['0', '0', '0'],
                    2022: ['0', '0', '0'],
                    2023: ['0', '0', '0'],
                    2024: ['0', '0', '0'],
                    2025: ['0', '0', '0'],
                    2026: ['0', '0', '0']
                };
                for (const yearInDb in newPriceObject) {
                    if (yearInDb === year) newPriceObject[yearInDb] = [priceFirst.value, priceSecond.value, priceThird.value];
                };
                const newDb = [...localPriceDb, ...[newPriceObject]];
                updateLocalDb(newDb);
            }
            break;
    }
    priceFirst.value = '0';
    priceSecond.value = '0';
    priceThird.value = '0';
}

allGtBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        setPriceComponent.style.display = 'block';
        setPriceComponent.children[1].innerText = e.target.innerText;
        const secondNumberInGt = e.target.innerText[2];
        switch (secondNumberInGt) {
            case '1':
                setPriceComponent.children[6].style.display = 'none';
                setPriceComponent.children[7].style.display = 'none';
                break;
            case '2':
                setPriceComponent.children[6].style.display = 'block';
                setPriceComponent.children[7].style.display = 'none';
                break;
            default:
                setPriceComponent.children[6].style.display = 'block';
                setPriceComponent.children[7].style.display = 'block';
                break;
        }
    })
})

changePirecesBtn.addEventListener('click', () => changePrices())

function getActualValues() {
    return {
        gt: document.getElementById('gt').value,
        endOfActualAgreement: {
            month: document.getElementById('dateToMonth').value,
            year: document.getElementById('dateToYear').value
        },
        endOfNewAgreement: document.getElementById('dateNewYear').value,
        wear: {
            sphereFirst: replaceAndParseMainFn(document.getElementById('wearFirst').value),
            sphereSecond: replaceAndParseMainFn(document.getElementById('wearSecond').value),
            sphereThird: replaceAndParseMainFn(document.getElementById('wearThird').value),
        },
        actualPrices: {
            sphereFirst: replaceAndParseMainFn(document.getElementById('hasPriceFirst').value),
            sphereSecond: replaceAndParseMainFn(document.getElementById('hasPriceSecond').value),
            sphereThird: replaceAndParseMainFn(document.getElementById('hasPriceThird').value),
        },
        proposition: {
            sphereFirst: replaceAndParseMainFn(document.getElementById('propositionFirst').value),
            sphereSecond: replaceAndParseMainFn(document.getElementById('propositionSecond').value),
            sphereThird: replaceAndParseMainFn(document.getElementById('propositionThird').value),
        }
    }
}

function whichYearsCalculate(startMonth, startYear, endYear) {
    const differenceInYears = replaceAndParseMainFn(endYear) - replaceAndParseMainFn(startYear);
    const resultTable = [];
    for (let index = 0; index < differenceInYears + 1; index++) {
        if (index === 0) {
            resultTable.push({
                [startYear]: replaceAndParseMainFn(startMonth) / 12
            })
        } else {
            const nextYear = replaceAndParseMainFn(startYear) + index;
            resultTable.push({
                [nextYear]: 1
            })
        }
        
    }
    console.log(resultTable)
    return resultTable
}

calculateBtn.addEventListener('click', () => {
    const inputData = getActualValues();
    const calculateYearsTable = whichYearsCalculate(inputData.endOfActualAgreement.month, inputData.endOfActualAgreement.year, inputData.endOfNewAgreement);
    switch (inputData.gt[2]) {
        case '1':

            break;
        case '2':

            break;
        default:
            break;
    }

});