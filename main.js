const engWord = document.getElementById('eng'),
      rusWord = document.getElementById('rus'),
      inputs = document.getElementsByClassName('input'),
      addButton = document.getElementById('add-word-btn'),
      table = document.getElementById('table');

let words;  // переменная для хранения массива словарных пар
let deleteBtn;

// проверяем есть ли сохраненные данные в localStorage
localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem('words'));

addButton.addEventListener('click', () => {
    if(
        engWord.value.length < 1 ||
        rusWord.value.length < 1 ||
        !isNaN(engWord.value) ||  // проверка на ввод числа
        !isNaN(rusWord.value)
    ) {  // если какле-либо значение не валидно то пробегаемся по инпутам и меняем стиль
        for(let input of inputs) {
            input.classList.add('error');
        }
    } else {
        for(let input of inputs) {
            input.classList.remove('error'); // удаляем класс 'error' если он был 
        }
        words.push(new CreateWord(engWord.value, rusWord.value));
        localStorage.setItem('words', JSON.stringify(words));
    }
})

// функция конструктор для создании языковой пары 
function CreateWord (english, russian) {
    this.english = english;
    this.russian = russian;
}
