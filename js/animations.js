// ============== Анимация числа счастливых  клиентов ======================
const INCREASE_NUMBER_ANIMATION_SPEED = 50;

function increaseNumberAnimationStep (i, element, endNumber) {
  if (i <= endNumber) {
    if (i === endNumber) {
      element.innerText = i + '+';
    } else {
      element.innerText = i;
    }

    i = i + 100;
        setTimeout(
        () => increaseNumberAnimationStep(i, element, endNumber),
        INCREASE_NUMBER_ANIMATION_SPEED
      );
    
 }
}

function initIncreaseNumberAnimation() {
  let element_my = document.querySelector(".features__clients-count")  
  increaseNumberAnimationStep (0, element_my, 5000) 
}

// ====== Добавляякм и убираем поле для ввода другое  ============

document.querySelector('#budget').addEventListener('change', function handleSelectChange(event) {
  if (event.target.value === 'other') {
    const formContainer = document.createElement('div');
    formContainer.classList.add('form__group');
    formContainer.classList.add('form__other-input');
 
    const input = document.createElement('input');
    input.placeholder = "Введите ваш вариант";
    input.type = "text";
 
    formContainer.appendChild(input);
        document.querySelector(".form .form__submit").before(formContainer); 
  }
 
  if (event.target.value !== 'other') {
    // ...
    const otherInput = document.querySelector('.form__other-input');
    otherInput.remove()
  }
});

// =============== работаем со скролом ====================

const header =  document.querySelector('header'); 
const didgital_pozisnin = document.querySelector('.features__clients-count').offsetTop; // находим тег с цифрами которые должны анимироваться 
let animationInited = false;

function updateScroll() {
  if (window.scrollY > 0) {
    // добавляем класс когда  скролинг начался 
    header.classList.add('header__scrolled');
  } else {
    // убираем класс когда мы вернулись к началу страницы 
   header.classList.remove('header__scrolled');
  }
  let windowBottomPosition = window.scrollY + window.innerHeight;
  let countElementPosition = document.querySelector('.features__clients-count').offsetTop;
  if (windowBottomPosition >= countElementPosition && !animationInited) {
      animationInited = true;
      initIncreaseNumberAnimation();
   }
}

window.addEventListener('scroll', updateScroll);
// =============== Делаем плавный переходж по ссылкам ===============
function addSmoothScroll(anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
 
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
}
 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  addSmoothScroll(anchor);
});
// =============== добавлям на кнопку "Узнать подробнее" ========== плавный переход ========
addSmoothScroll(document.querySelector('.more-button'));