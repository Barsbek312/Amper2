'use strict';

const searchInput = document.querySelector('[data-search]');
let searchForCart = JSON.parse(localStorage.getItem('cart'));

searchInput.addEventListener('input',  e => {

    const value = e.target.value;

    cards.forEach(card => {

        const isVisible = card.title.toLowerCase().includes(value.toLowerCase());
        card.element.classList.toggle('hide', !isVisible);

    })

});

// adding cards


const topicsCardTemplate = document.querySelector('[data-topics-template]');
const topicsCardContainer = document.querySelector('[data-topics-card-container]');

let cards = [];


let response = fetch("https://amper2.vercel.app/cards/db.json/cards")
.then(res => res.json())
.then(data => {
    console.log(data);
    return cards = data.map(card => {

        const item = topicsCardTemplate.content.cloneNode(true).children[0];
        const cardImage = item.querySelector('[data-image]');
        const cardTitle = item.querySelector('[data-title]');
        const cardPrice = item.querySelector('[data-price]');
        const cardProduct = item.querySelector('[data-by-product]');
        const cardItem = cardPrice.closest('.main__cards_item');

        cardItem.dataset.id = card.id;
        cardTitle.textContent = card.title;
        cardImage.src = card.imageUrl;
        cardPrice.textContent = card.price;
        cardProduct.textContent = card.product;

        topicsCardContainer.append(item);

        return({price: card.price, title: card.title, product: card.product, image: card.imageUrl, element: item, id: card.id})
    
    })

}).then((obj) => {

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
    return obj;

})
.then(obj => {
    obj.forEach(item => {

        const heartBtn = item.element.querySelector('.heart');
        const cartBtn = item.element.querySelector('#cartBtn');

        addClassForBtn(heartBtn, 'active', 'favorites');
        addClassForBtn(cartBtn, 'add__toCart', 'cart');

    })
}).catch(err => console.error('Error: ', err));

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

