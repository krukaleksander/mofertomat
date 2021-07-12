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

    return resultTable
}

function checkIfSomePriceIsZero(yearsArr, pricesObj) {
    let result = true;
    for (const year in pricesObj) {
        if (pricesObj[year] === '0' || pricesObj[year][0] === '0') {
            yearsArr.forEach(element => {
                if (element.hasOwnProperty([year])) result = false;
            })

        }
    }
    return result;
}

calculateBtn.addEventListener('click', () => {
    const inputData = getActualValues();
    const {
        gt,
        endOfActualAgreement,
        endOfNewAgreement,
        wear,
        actualPrices,
        proposition
    } = inputData;
    let marge2021 = 0;
    let marge2022 = 0;
    let marge2023 = 0;
    let marge2024 = 0;
    let marge2025 = 0;
    let marge2026 = 0;
    let margeMass = 0;
    const calculateYearsTable = whichYearsCalculate(endOfActualAgreement.month, endOfActualAgreement.year, endOfNewAgreement);
    const pricesFromDb = localPriceDb.find(priceObject => priceObject.name === gt.toLowerCase());
    const calculateFlag = checkIfSomePriceIsZero(calculateYearsTable, pricesFromDb);
    if (pricesFromDb === undefined) return alert('Nie masz wprowadzonych cen dla tej GT');
    if (!calculateFlag) return alert('W wybranym przez Ciebie okresie jest rok, dla którego nie masz podanej ceny!');
    switch (gt[2]) {
        case '1':
            // if(wear.sphereFirst === 0) return alert('Zużycie 0?');
            // if(proposition.sphereFirst === 0) return alert('Za darmo chcesz oddać ten prąd? Propozycja 0?');            
            calculateYearsTable.forEach(obj => {
                if (obj.hasOwnProperty('2021')) {
                    marge2021 = ((proposition.sphereFirst - replaceAndParseMainFn(pricesFromDb[2021])) * wear.sphereFirst) * obj[2021];
                }
                if (obj.hasOwnProperty('2022')) {
                    marge2022 = ((proposition.sphereFirst - replaceAndParseMainFn(pricesFromDb[2022])) * wear.sphereFirst) * obj[2022];
                }
                if (obj.hasOwnProperty('2023')) {
                    marge2023 = ((proposition.sphereFirst - replaceAndParseMainFn(pricesFromDb[2023])) * wear.sphereFirst) * obj[2023];
                }
                if (obj.hasOwnProperty('2024')) {
                    marge2024 = ((proposition.sphereFirst - replaceAndParseMainFn(pricesFromDb[2024])) * wear.sphereFirst) * obj[2024];
                }
                if (obj.hasOwnProperty('2025')) {
                    marge2025 = ((proposition.sphereFirst - replaceAndParseMainFn(pricesFromDb[2025])) * wear.sphereFirst) * obj[2025];
                }
                if (obj.hasOwnProperty('2026')) {
                    marge2026 = ((proposition.sphereFirst - replaceAndParseMainFn(pricesFromDb[2026])) * wear.sphereFirst) * obj[2026];
                }
            })

            break;
        case '2':
            calculateYearsTable.forEach(obj => {
                if (obj.hasOwnProperty('2021')) {
                    marge2021 = (((((proposition.sphereFirst - replaceAndParseMainFn(pricesFromDb[2021][0])) * wear.sphereFirst)) + ((proposition.sphereSecond - replaceAndParseMainFn(pricesFromDb[2021][1])) * wear.sphereSecond))) * obj[2021];
                }
                if (obj.hasOwnProperty('2022')) {
                    marge2022 = (((((proposition.sphereFirst - replaceAndParseMainFn(pricesFromDb[2022][0])) * wear.sphereFirst)) + ((proposition.sphereSecond - replaceAndParseMainFn(pricesFromDb[2022][1])) * wear.sphereSecond))) * obj[2022];
                }
                if (obj.hasOwnProperty('2023')) {
                    marge2023 = (((((proposition.sphereFirst - replaceAndParseMainFn(pricesFromDb[2023][0])) * wear.sphereFirst)) + ((proposition.sphereSecond - replaceAndParseMainFn(pricesFromDb[2023][1])) * wear.sphereSecond))) * obj[2023];
                }
                if (obj.hasOwnProperty('2024')) {
                    marge2024 = (((((proposition.sphereFirst - replaceAndParseMainFn(pricesFromDb[2024][0])) * wear.sphereFirst)) + ((proposition.sphereSecond - replaceAndParseMainFn(pricesFromDb[2024][1])) * wear.sphereSecond))) * obj[2024];
                }
                if (obj.hasOwnProperty('2025')) {
                    marge2025 = (((((proposition.sphereFirst - replaceAndParseMainFn(pricesFromDb[2025][0])) * wear.sphereFirst)) + ((proposition.sphereSecond - replaceAndParseMainFn(pricesFromDb[2025][1])) * wear.sphereSecond))) * obj[2025];
                }
                if (obj.hasOwnProperty('2026')) {
                    marge2026 = (((((proposition.sphereFirst - replaceAndParseMainFn(pricesFromDb[2026][0])) * wear.sphereFirst)) + ((proposition.sphereSecond - replaceAndParseMainFn(pricesFromDb[2026][1])) * wear.sphereSecond))) * obj[2026];
                }
            })
            break;
        default:
            calculateYearsTable.forEach(obj => {
                if (obj.hasOwnProperty('2021')) {
                    marge2021 = ((((((proposition.sphereFirst - replaceAndParseMainFn(pricesFromDb[2021][0])) * wear.sphereFirst)) + ((proposition.sphereSecond - replaceAndParseMainFn(pricesFromDb[2021][1])) * wear.sphereSecond)) + (((proposition.sphereThird - replaceAndParseMainFn(pricesFromDb[2021][2])) * wear.sphereThird)))) * obj[2021];
                }
                if (obj.hasOwnProperty('2022')) {  
                    marge2022 = ((((((proposition.sphereFirst - replaceAndParseMainFn(pricesFromDb[2022][0])) * wear.sphereFirst)) + ((proposition.sphereSecond - replaceAndParseMainFn(pricesFromDb[2022][1])) * wear.sphereSecond)) + (((proposition.sphereThird - replaceAndParseMainFn(pricesFromDb[2022][2])) * wear.sphereThird)))) * obj[2022];
                }
                if (obj.hasOwnProperty('2023')) {
                    marge2023 = ((((((proposition.sphereFirst - replaceAndParseMainFn(pricesFromDb[2023][0])) * wear.sphereFirst)) + ((proposition.sphereSecond - replaceAndParseMainFn(pricesFromDb[2023][1])) * wear.sphereSecond)) + (((proposition.sphereThird - replaceAndParseMainFn(pricesFromDb[2023][2])) * wear.sphereThird)))) * obj[2023];
                }
                if (obj.hasOwnProperty('2024')) {
                    marge2024 = ((((((proposition.sphereFirst - replaceAndParseMainFn(pricesFromDb[2024][0])) * wear.sphereFirst)) + ((proposition.sphereSecond - replaceAndParseMainFn(pricesFromDb[2024][1])) * wear.sphereSecond)) + (((proposition.sphereThird - replaceAndParseMainFn(pricesFromDb[2024][2])) * wear.sphereThird)))) * obj[2024];
                }
                if (obj.hasOwnProperty('2025')) {
                    marge2025 = ((((((proposition.sphereFirst - replaceAndParseMainFn(pricesFromDb[2025][0])) * wear.sphereFirst)) + ((proposition.sphereSecond - replaceAndParseMainFn(pricesFromDb[2025][1])) * wear.sphereSecond)) + (((proposition.sphereThird - replaceAndParseMainFn(pricesFromDb[2025][2])) * wear.sphereThird)))) * obj[2025];
                }
                if (obj.hasOwnProperty('2026')) {
                    marge2026 = ((((((proposition.sphereFirst - replaceAndParseMainFn(pricesFromDb[2026][0])) * wear.sphereFirst)) + ((proposition.sphereSecond - replaceAndParseMainFn(pricesFromDb[2026][1])) * wear.sphereSecond)) + (((proposition.sphereThird - replaceAndParseMainFn(pricesFromDb[2026][2])) * wear.sphereThird)))) * obj[2026];
                }
            })
            break;
    }
    margeMass = (marge2021 + marge2022 + marge2023 + marge2024 + marge2025 + marge2026).toFixed(2);    
console.log(margeMass)
});