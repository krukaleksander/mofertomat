// zmienne

const closeChooseGtComponent = document.getElementById('closeSetPrices');
const chooseGtComponent = document.querySelector('.prices__choose-gt');
const closeSetPrice = document.getElementById('closeSetPrice');
const setPriceComponent = document.querySelector('.prices__insert');
const openChooseGtComponent = document.querySelector('.prices__add-btn');
const allGtBtns = [...document.querySelectorAll('.prices__gt-btn')];
const calculateBtn = document.getElementById('calculateBtn');


// koniec zmienne


closeChooseGtComponent.addEventListener('click', () => chooseGtComponent.style.display = 'none');

closeSetPrice.addEventListener('click', () => setPriceComponent.style.display = 'none');

openChooseGtComponent.addEventListener('click', () => chooseGtComponent.style.display = 'flex');

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

// pobieranie bazy zapisanych cen

const localPriceDb = window.localStorage.getItem('ofertomatPrices');

// koniec pobieranie bazy zapisanych cen


calculateBtn.addEventListener('click', () => {
    if(localPriceDb === null) return alert('Nie wprowadzono jeszcze żadnyh cen!')
})