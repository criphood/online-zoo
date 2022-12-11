'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const pick = document.querySelector('.pick'),
        dots = pick.querySelectorAll('.amount__dot-wrapper'),
        cash = pick.querySelectorAll('.amount__cash-item'),
        input = pick.querySelector('.another__amount-input');


    input.addEventListener('input', () => {
        console.log(input.value);
        if (input.value.length >= 4) input.value = input.value.substr(0, 4);
        dots.forEach(item => {
            item.classList.add('hide');

            cash.forEach((element, j) => {
                element.classList.remove('choosen');

                if (input.value === element.children[1].textContent) {
                    element.classList.add('choosen');
                    dots[j].classList.remove('hide');
                }
            })
        });
    })

    dots.forEach((item, i) => {
        item.addEventListener('click', () => {
            dots.forEach(item => {
                item.classList.add('hide');
            });

            item.classList.remove('hide');

            cash.forEach((element, j) => {
                element.classList.remove('choosen');
                if (i === j) {
                    element.classList.add('choosen');
                    input.value = element.children[1].textContent;
                }
            })
        });
    });
});