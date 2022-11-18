'use strict';

const topicsCardTemplate = document.querySelector('[data-topics-template]');
const topicsCardContainer = document.querySelector('[data-topics-card-container]');

let cards = [];

const favoriteStorage = JSON.parse(localStorage.getItem('favorites') ?? '[]');

const mainClear = document.querySelector('.mainClear');
const mainCards = document.querySelector('.main__cards');
const cartTitle = document.querySelector('.cart__title');

if(favoriteStorage.length == 0){

    mainCards.classList.remove('flex');
    cartTitle.classList.remove('block');
    mainClear.classList.add('block');

}else{

    mainCards.classList.add('flex');
    cartTitle.classList.add('block');
    mainClear.classList.remove('block');

    cards = favoriteStorage.map(card => {

        const item = topicsCardTemplate.content.cloneNode(true).children[0];
        const cardImage = item.querySelector('[data-image]');
        const cardTitle = item.querySelector('[data-title]');
        const cardPrice = item.querySelector('[data-price]');
        const cardItem = cardPrice.closest('.main__cards_item');
            
        cardItem.dataset.id = card.id;
        cardTitle.textContent = card.name;
        cardImage.src = card.avatar;
        cardPrice.textContent = card.price;
            
        topicsCardContainer.append(item);

        return({price: card.price, title: card.name, image: card.avatar, element: item, id: card.id})
            
    });

    if(favoriteStorage.length == 1) {
        const oneId = document.querySelector('[data-id]');
        oneId.style.minWidth = '90%';
    }

}

const searchInput = document.querySelector('[data-search]');
let searchForCart = JSON.parse(localStorage.getItem('cart'));

searchInput.addEventListener('input',  e => {

    const value = e.target.value;

    cards.forEach(card => {

        const isVisible = card.title.toLowerCase().includes(value.toLowerCase());
        card.element.classList.toggle('hide', !isVisible);

    });

    if((cards.length - cards.filter(card => card.element.classList.contains('hide')).length) == 1){
        [...allId].forEach(item => {

            if(!item.classList.contains('hide')) {
                item.style.minWidth = '45%';
            }
        })
    }else if((cards.length - cards.filter(card => card.element.classList.contains('hide')).length) == 2){
        document.querySelector('.main__cards_list').style.minWidth = '90%';
    }
    else{
        [...allId].forEach(item => {

            if(!item.classList.contains('hide')) {
                item.style.minWidth = '';
            }
        })
    }

});

const allId = document.querySelectorAll('[data-id]');
    
checkClassForBtn('cart', '#cartBtn', 'add__toCart');
checkClassForBtn('favorites', '#favoriteBtn', 'active');

function checkClassForBtn(name, id, nameOfClass) {

    let getName = localStorage.getItem(name) ?? '[]';
    getName = JSON.parse(getName);
    
    getName.forEach(item => {
        [...allId].find(nameItem => nameItem.dataset.id == item.id).querySelector(`${id}`).classList.add(`${nameOfClass}`)
    })

}

[...allId].forEach(item => {

    const heartBtn = item.querySelector('.heart');
    const cartBtn = item.querySelector('#cartBtn');

    addClassForBtn(heartBtn, 'active', 'favorites');
    addClassForBtn(cartBtn, 'add__toCart', 'cart');

})

function addClassForBtn(element, nameOfClass, link) {
    const allId = document.querySelectorAll('[data-id]');
    element.addEventListener('click', () => {

        element.classList.toggle(`${nameOfClass}`);

        const addItem = [...allId].filter(itemInCart => [...itemInCart.querySelectorAll('button')].find(btnItem => btnItem.classList.contains(`${nameOfClass}`)));
        
        const addObj = addItem.map(item => item = 
            {

                price: item.querySelector(['[data-price']).textContent,
                name: item.querySelector('[data-title]').textContent,
                avatar: item.querySelector('[data-image]').getAttribute('src'),
                id: item.dataset.id,

            });

        if(link == 'cart') {
            addObj.forEach(item => item.num = '1');
        }

        localStorage.setItem(`${link}`, JSON.stringify(addObj));

    })
};