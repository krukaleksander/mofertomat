// zmienne

const closeChooseGtComponent = document.getElementById('closeSetPrices');
const chooseGtComponent = document.querySelector('.prices__choose-gt');
const closeSetPrice = document.getElementById('closeSetPrice');
const setPriceComponent = document.querySelector('.prices__insert');
const openChooseGtComponent = document.querySelector('.prices__add-btn');
const allGtBtns = [...document.querySelectorAll('.prices__gt-btn')];

closeChooseGtComponent.addEventListener('click', () => chooseGtComponent.style.display = 'none');

closeSetPrice.addEventListener('click', () => setPriceComponent.style.display = 'none');

openChooseGtComponent.addEventListener('click', () => chooseGtComponent.style.display = 'flex');

allGtBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        setPriceComponent.style.display = 'block';
        setPriceComponent.children[1].innerText = e.target.innerText;
    })
})