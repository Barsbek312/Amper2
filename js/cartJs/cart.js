'use strict';

const topicsCardTemplate = document.querySelector('[data-topics-template]');
const topicsCardContainer = document.querySelector('[data-topics-card-container]');

let cards = [];

const cartStorage = JSON.parse(localStorage.getItem('cart') ?? '[]');


const mainClear = document.querySelector('.mainClear');
const mainCards = document.querySelector('.main__cards');
const cartTitle = document.querySelector('.cart__title');

if(cartStorage.length == 0){

    mainCards.classList.remove('flex');
    cartTitle.classList.remove('block');
    mainClear.classList.add('block');

}
else{

    mainCards.classList.add('flex');
    cartTitle.classList.add('block');
    mainClear.classList.remove('block');

    cards = cartStorage.map(card => {

        const item = topicsCardTemplate.content.cloneNode(true).children[0];
        const cardImage = item.querySelector('[data-image]');
        const cardTitle = item.querySelector('[data-title]');
        const cardPrice = item.querySelector('[data-price]');
        const cardItem = cardPrice.closest('.main__cards_item');
        const cardAmount = item.querySelector('[data-number]');
            
        cardItem.dataset.id = card.id;
        cardTitle.textContent = card.name;
        cardImage.src = card.avatar;
        cardPrice.textContent = card.price;
        cardAmount.textContent = card.num;
            
        topicsCardContainer.append(item);

        return({price: card.price, title: card.name, image: card.avatar, element: item, id: card.id})
            
    });

    if(cartStorage.length == 1){
        const oneId = document.querySelector('[data-id]');
        oneId.style.minWidth = '90%';
    }

}

const searchInput = document.querySelector('[data-search]');
let searchForCart = JSON.parse(localStorage.getItem('cart'));

searchInput.addEventListener('input',  e => {

    const value = e.target.value;
    let counter = 0;

    cards.forEach(card => {

        const isVisible = card.title.toLowerCase().includes(value.toLowerCase());
        card.element.classList.toggle('hide', !isVisible);

    })

    if((cards.length - cards.filter(card => card.element.classList.contains('hide')).length) == 1){
        [...allId].forEach(item => {
            console.log(item)
            if(!item.classList.contains('hide')) {
                item.style.minWidth = '90%';
            }
        })
    }else{
        [...allId].forEach(item => {
            console.log(item)
            if(!item.classList.contains('hide')) {
                item.style.minWidth = '';
            }
        })
    }

});

const getFavoriteItem = JSON.parse(localStorage.getItem('favorites'));

if(getFavoriteItem) {
    getFavoriteItem.forEach(item => {
        const allId = document.querySelectorAll('[data-id]');

        let check = [...allId].find(favoriteItem => favoriteItem.dataset.id == item.id);
    
        if(check) {
            check.querySelector('#favoriteBtn').classList.add('active');
        }
    
    })

    const allId = document.querySelectorAll('[data-id]');
    const heartBtn = document.querySelectorAll('.heart');

    heartBtn.forEach(hrtItem => {

        hrtItem.addEventListener('click', () => {

            hrtItem.classList.toggle(`active`);
    
            const addItem = [...allId].filter(itemInCart => [...itemInCart.querySelectorAll('button')].find(btnItem => btnItem.classList.contains('favorites')));
            
            const addObj = addItem.map(item => item = 
                {
    
                    price: item.querySelector(['[data-price']).textContent,
                    name: item.querySelector('[data-title]').textContent,
                    avatar: item.querySelector('[data-image]').getAttribute('src'),
                    id: item.dataset.id,
                    
                });
    
            localStorage.setItem('favorites', JSON.stringify(addObj));
    
        })

    })

}

const elemCostConclusion = document.querySelector('[data-cost]');
const elemAmount = document.querySelector('[data-amount]');

const counterPlus = document.querySelectorAll('#counterPlus');
const counterMinus = document.querySelectorAll('#counterMinus');
const counterNum = document.querySelectorAll('#counterNum');

let costConclusion = 0;
let amountConclusion = 0;

if(cartStorage) {

    const allId = document.querySelectorAll('[data-id]');


    costConclusion = 0;
    amountConclusion = 0;
    
    for(let i = 0; i < counterPlus.length; i++){

        let findCard = [...allId].find(card => card.dataset.id == cartStorage[i].id).querySelector('#counterNum').innerText;
        costConclusion += Number(cartStorage[i].price.replace(/\D/g,'')) * Number(findCard);
        amountConclusion += Number(findCard);

        window.addEventListener('click', (e) => {
                
            const parentElem = counterPlus[i].closest('.cards__item_end');
            const currentPrice = parentElem.querySelector('[data-price]');

            if(e.target == counterPlus[i]) {

                counterNum[i].innerText = Number(counterNum[i].innerText) + 1;
                fetchOnCartNum(counterNum[i], counterNum[i].innerText, cartStorage);
                elemCostConclusion.innerText = Number(elemCostConclusion.innerText) + Number(currentPrice.innerText.replace(/\D/g,''));
                elemAmount.innerText = Number(elemAmount.innerText) + 1    

            }else if(e.target == counterMinus[i] && Number(counterNum[i].innerText) > 0) {

                counterNum[i].innerText = Number(counterNum[i].innerText) - 1;
                fetchOnCartNum(counterNum[i], counterNum[i].innerText, cartStorage);
                elemCostConclusion.innerText = Number(elemCostConclusion.innerText) - Number(currentPrice.innerText.replace(/\D/g,''));
                elemAmount.innerText = Number(elemAmount.innerText) - 1                            
                
            }
            if((e.target == counterPlus[i] || e.target == counterMinus[i]) && counterNum[i].innerText == 0){
                
                const newObj = JSON.parse(localStorage.getItem('cart'))
                const newObjDelete = newObj.filter(itemDelete => itemDelete.num != 0);
                
                localStorage.setItem('cart', JSON.stringify(newObjDelete));

            }

        });

    };

    elemCostConclusion.innerText = costConclusion;
    elemAmount.innerText = amountConclusion;

};


const counterOrder = document.querySelector('#counterOrder');
const modalElem = document.querySelector('.modal');
const modalWindow = document.querySelector('.modal__window');
const orderProducts = document.querySelector('#orderProducts');
const allId = document.querySelectorAll('[data-id]');

orderProducts.addEventListener("click", () => {
    let code = "1097635472:AAFR1gGCRh4A5gunrvutnkvWwZgC7nrlNgc";
    let chatId = "-878470820";
    let inputStreet = document.querySelector('#inputStreet');
    let inputHouse = document.querySelector('#inputHouse');
    let inputContact = document.querySelector('#inputContact');
    let inputAppartment = document.querySelector('#inputAppartment');
    const checkInputs = document.querySelector('#checkInputs')
    if(inputStreet.value.length == 0 ||  inputHouse.value.length == 0 || inputContact.value.length == 0) {
        checkInputs.style.display = 'block';
        return 0;   
    
    }else{
        checkInputs.style.display = 'none';
        const allId = document.querySelectorAll('[data-id]');
        let objForOrder = [];
        [...allId].forEach(item => objForOrder.push(item.querySelector('[data-title]').textContent + ' - ' + item.querySelector('[data-number]').textContent + 'шт' + '\n'));
        

        let text = `
Улица: ${inputStreet.value}

Дом: ${inputHouse.value}

Квартира: ${inputAppartment.value}

Телефон: ${inputContact.value}

Сумма: ${elemCostConclusion.innerText} сом

Товары: 
${objForOrder.join('')}
Всего товаров: ${document.querySelector('[data-amount]').textContent + 'шт'}
        `;

        const mainCards = document.querySelector('.main__cards');
        const cartTitle = document.querySelector('.cart__title');
        const mainClear = document.querySelector('.mainClear');
        const afterClick = document.querySelector('.after__click');
        const modalForm = document.querySelector('.modal__form');

        otpravka(code, text, chatId);

        function otpravka(token, text, chatid) {

            var z = $.ajax({  

                type: "POST",  
                url: "https://api.telegram.org/bot"+token+"/sendMessage?chat_id="+chatid,
                data: "parse_mode=HTML&text="+encodeURIComponent(text),
                error: () => {alert('Заказ не был принят по техническим ошибкам, попробуйте еще раз')} 

            });

            afterClick.classList.add('flex')
            modalForm.classList.add('hide')

            mainClear.classList.add('block');
            cartTitle.classList.remove('block');
            mainCards.classList.remove('flex');

            localStorage.removeItem('cart');
        };

    }

});

counterOrder.addEventListener('click', () => {
        
    modalElem.style.transform = 'translateX(0)';
    modalElem.style.opacity = '1';
        
});

modalElem.addEventListener("click", (e) => {

    if(!$(e.target).closest(modalWindow).length){
            
        modalElem.style.transform = 'translateX(100%)';
        modalElem.style.opacity = '0';

    }

});


function fetchOnCartNum(element, item, object) {

    const parentElement = element.closest('.main__cards_item');

    if(object) {

        const newObj = JSON.parse(localStorage.getItem('cart') ?? '[]');
        newObj.map(cartItem => {
            if(cartItem.id == parentElement.dataset.id) {
                cartItem.num = item
            }
        })
        
        localStorage.setItem('cart', JSON.stringify(newObj))

    }

}