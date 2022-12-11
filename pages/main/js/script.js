'use strict';

window.addEventListener('DOMContentLoaded', () => {

    // Slider Pets

    const slider = document.querySelector('.slider'),
        cards = slider.querySelector('.cards'),
        cardsFirst = cards.querySelector('.cards__first'),
        cardsSecond = cards.querySelector('.cards__second'),
        pandas = cardsFirst.querySelector('#pandas'),
        buttonsPrev = slider.querySelectorAll('.prev'),
        buttonsNext = slider.querySelectorAll('.next'),
        containerWidth = +window.getComputedStyle(cardsFirst).width.replace(/[a-z]/g, ''),
        cardWidth = +window.getComputedStyle(pandas).width.replace(/[a-z]/g, ''),
        gap = +window.getComputedStyle(cardsFirst).gap.replace(/[a-z]/g, ''),
        numberOfCards = Math.floor(containerWidth / cardWidth);

    const cardSet = [
        `<a>
            <div class="pet">
                <img src="../../assets/images/pandas.jpg" alt="pandas">
            </div>
            <div class="card__description herbivores">
                <div class="card__description-header">GIANT PANDAS</div>
                <div class="card__description-text">Native to Southwest China</div>
            </div>
        </a>`,

        `<a>
            <div class="pet">
                <img src="../../assets/images/eagles.jpg" alt="eagles">
            </div>
            <div class="card__description predators">
                <div class="card__description-header">EAGLES</div>
                <div class="card__description-text">Native to South America</div>
            </div>
        </a>`,

        `<a>
            <div class="pet">
                <img src="../../assets/images/cheetahs.jpg" alt="cheetahs">
            </div>
            <div class="card__description predators">
                <div class="card__description-header">CHEETAHS</div>
                <div class="card__description-text">Native to Africa</div>
            </div>
        </a>`,

        `<a>
            <div class="pet">
                <img src="../../assets/images/gorillas.jpg" alt="gorillas">
            </div>
            <div class="card__description herbivores">
                <div class="card__description-header">GORILLAS</div>
                <div class="card__description-text">Native to Congo</div>
            </div>
        </a>`,

        `<a>
            <div class="pet">
                <img src="../../assets/images/alligators.jpg" alt="alligators">
            </div>
            <div class="card__description predators">
                <div class="card__description-header">ALLIGATORS</div>
                <div class="card__description-text">Native to Southeastern U.S.</div>
            </div>
        </a>`,

        `<a>
            <div class="pet">
                <img src="../../assets/images/sloth.jpg" alt="sloth">
            </div>
            <div class="card__description herbivores">
                <div class="card__description-header">TWO-TOED SLOTH</div>
                <div class="card__description-text">Mesoamerica, South America</div>
            </div>
        </a>`
    ];

    let offset = 0;

    buttonsNext.forEach(item => {
        item.addEventListener('click', () => {
            offset += (containerWidth + gap);
            forbidUsingButtons(item);
            addSlides();
            moveSlide();
            setTimeout(disableTransition, 550);
            setTimeout(deleteSlidesFromLeft, 600);
            setTimeout(enableTransition, 650);
        });
    });

    buttonsPrev.forEach(item => {
        item.addEventListener('click', () => {
            offset -= (containerWidth + gap);
            forbidUsingButtons(item);
            addSlides();
            moveSlide();
            setTimeout(disableTransition, 550);
            setTimeout(deleteSlidesFromRight, 600);
            setTimeout(enableTransition, 650);
        });
    });

    function moveSlide() {
        if (offset > 0) {
            cardsFirst.style.transform = `translateX(-${offset}px)`;
            cardsSecond.style.transform = `translateX(-${offset}px)`;
        } else {
            cardsFirst.style.transform = `translateX(${-offset}px)`;
            cardsSecond.style.transform = `translateX(${-offset}px)`;
        }
    }

    function addSlides() {
        const subsequence = generateNumberSequence();

        for (let i = 0; i < numberOfCards; i++) {
            render(0, i, cardsFirst);
            render(1, i, cardsSecond);
        }

        function render(j, i, target) {
            let next = document.createElement("div");
            next.classList.add('card');
            next.innerHTML = `${cardSet[subsequence[j][i]]}`;
            target.prepend(next);

            let prev = document.createElement("div");
            prev.classList.add('card');
            prev.innerHTML = `${cardSet[subsequence[j][i]]}`;
            target.append(prev);
        }
    }

    function deleteSlidesFromRight() {
        const newFirstCards = cardsFirst.querySelectorAll('.card'),
            newSecondCards = cardsSecond.querySelectorAll('.card');

        for (let i = numberOfCards; i < newFirstCards.length; i++) {
            newFirstCards[i].remove();
            newSecondCards[i].remove();
        }

        cardsFirst.style.transform = `translateX(0)`;
        cardsSecond.style.transform = `translateX(0)`;
        offset = 0;
    }

    function deleteSlidesFromLeft() {
        const newFirstCards = cardsFirst.querySelectorAll('.card'),
            newSecondCards = cardsSecond.querySelectorAll('.card');

        for (let i = 0; i < newFirstCards.length - numberOfCards; i++) {
            newFirstCards[i].remove();
            newSecondCards[i].remove();
        }

        cardsFirst.style.transform = `translateX(0)`;
        cardsSecond.style.transform = `translateX(0)`;
        offset = 0;
    }

    function enableTransition() {
        cardsFirst.classList.remove('transition__disabled');
        cardsSecond.classList.remove('transition__disabled');
        cardsFirst.classList.add('transition__enabled');
        cardsSecond.classList.add('transition__enabled');
    }

    function disableTransition() {
        cardsFirst.classList.remove('transition__enabled');
        cardsSecond.classList.remove('transition__enabled');
        cardsFirst.classList.add('transition__disabled');
        cardsSecond.classList.add('transition__disabled');
    }

    function forbidUsingButtons(item) {
        item.disabled = true;
        setTimeout(() => {
            item.disabled = false;
        }, 800);
    }

    function generateNumberSequence() {
        const sequence = [0, 1, 2, 3, 4, 5].sort(() => {
            return 0.5 - Math.random();
        });

        const first = sequence.slice(0, 3),
            second = sequence.slice(3);

        return [[...first], [...second]];
    }


    // Slider Testimonials

    const wrapper = document.querySelector('.container__testimonials'),
          bar = wrapper.querySelector('.container__bar-inner'),
          inner = wrapper.querySelector('.container__testimonials-inner'),
          testimonial = wrapper.querySelector('.testimonial__wrapper'),
          testimonialWidth = +window.getComputedStyle(testimonial).width.replace(/[a-z]/g, ''),
          testimonialGap = +window.getComputedStyle(inner).gap.replace(/[a-z]/g, '');

    let testimonialsOffset = 0;

    bar.addEventListener('input', () => {
        testimonialsOffset = testimonialWidth + (testimonialGap);
        console.log(testimonialGap);
        inner.style.transform = `translateX(${-(testimonialsOffset * bar.value)}px)`;
    });


    // Testimonial Popup

    const testimonials = inner.querySelectorAll('.testimonial__wrapper'),
          testimonialModal = document.querySelector('.testimonial__modal'),
          icon = testimonialModal.querySelector('.close__icon');

    let popup = document.createElement('div'),
        closeIcon = document.createElement('div');

    testimonials.forEach(item => {
        item.addEventListener('click', () => {
            showModal(testimonialModal, 'show__testimonial', 'hide__testimonial');

            popup.classList.add('testimonial__wrapper');
            testimonialModal.append(popup);
            popup.innerHTML = item.innerHTML;

            closeIcon.classList.add('close__icon');
            popup.append(closeIcon);
            closeIcon.innerHTML = icon.innerHTML;
            closeIcon.style.display = 'flex';
        });
    });

    testimonialModal.addEventListener('click', (e) => {
        if (e.target === testimonialModal) hideTestimonialsModal();
    });

    closeIcon.addEventListener('click', hideTestimonialsModal);

    function showModal(target, add, remove) {
        target.classList.add(add);
        target.classList.remove(remove);
    }

    function closeModal(target, add, remove) {
        target.classList.add(add);
        target.classList.remove(remove);
    }

    function hideTestimonialsModal() {
        closeModal(testimonialModal, 'hide__testimonial', 'show__testimonial');
        closeIcon.style.display = 'none';
        popup.remove();
    }
});

