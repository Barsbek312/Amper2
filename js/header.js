'use strict';


const btnCatalog = document.querySelector('#catalog__btn')
const sideBarShadow = document.querySelector('.sidebar_shadow')
const sideBar = document.querySelector('.sidebar'); 

btnCatalog.addEventListener('click', () => {

    sideBarShadow.classList.add('sidebar__visible');

});


sideBarShadow.addEventListener('click', (e) => {

    if(!$(e.target).closest(sideBar).length) {
        sideBarShadow.classList.remove('sidebar__visible');
    }
    
})
