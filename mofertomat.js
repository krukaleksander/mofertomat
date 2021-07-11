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
if(!window.localStorage.getItem('ofertomatPrices')) {
    localPriceDb = [{name: 'c11', 2021: '0', 2022: '0', 2023: '0', 2024: '0', 2025: '0', 2026: '0'}];
    updateLocalDb(localPriceDb);
} else {   
    getLocalDb();
}
 

// koniec pobieranie bazy zapisanych cen

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
    const priceFirst = document.getElementById('basePriceFirst').value;
    switch (gt[2]) {
        case '1':
           const actualInDb = localPriceDb.find(priceObject => priceObject.name === gt.toLowerCase());
           if(actualInDb) {
            const baseWithoutThisGt = localPriceDb.filter(obj => obj.name !== gt.toLowerCase());
            for (const yearInDb in actualInDb) {
                if(yearInDb === year) actualInDb[yearInDb] = priceFirst;               
              }
              const newDb = [...baseWithoutThisGt, ...[actualInDb]];
              updateLocalDb(newDb);
           } else {
             const newPriceObject = {name: gt.toLowerCase(), 2021: '0', 2022: '0', 2023: '0', 2024: '0', 2025: '0', 2026: '0'};
             for (const yearInDb in newPriceObject) {
                if(yearInDb === year) newPriceObject[yearInDb] = priceFirst;               
              };
              const newDb = [...localPriceDb, ...[newPriceObject]];
              updateLocalDb(newDb);
           }
            break;
        case '2':
            
            break;
        
        default:
            break;
    }
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


calculateBtn.addEventListener('click', () => {
    if(localPriceDb[0] === null) return alert('Nie wprowadzono jeszcze żadnyh cen!')
});

