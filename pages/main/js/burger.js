'use strict';

window.addEventListener('DOMContentLoaded', () => {
    // Burger menu

    const burgerModal = document.querySelector('.burger__modal'),
        menu = burgerModal.querySelector('.burger__menu-nav'),
        menuCloser = burgerModal.querySelector('.button__closer'),
        menuItems = menu.querySelectorAll('a[href*="#"]'),
        menuOpener = document.querySelector('.burger__icon');

    menuOpener.addEventListener('click', () => {
        showModal(burgerModal, 'show__menu', 'hide__menu');
    });

    menuCloser.addEventListener('click', () => {
        closeModal(burgerModal, 'hide__menu', 'show__menu');
    });

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            closeModal(burgerModal, 'hide__menu', 'show__menu');
        });
    });

    burgerModal.addEventListener('click', (e) => {
        if (e.target == burgerModal) {
            closeModal(burgerModal, 'hide__menu', 'show__menu');
        }
    });

    function showModal(target, add, remove) {
        target.classList.add(add);
        target.classList.remove(remove);
    }

    function closeModal(target, add, remove) {
        target.classList.add(add);
        target.classList.remove(remove);
    }
})
