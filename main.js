const engWord = document.getElementById('eng'),
      rusWord = document.getElementById('rus'),
      inputs = document.getElementsByClassName('input'),
      addButton = document.getElementById('add-word-btn'),
      table = document.getElementById('table');

let words;  // переменная для хранения массива словарных пар
let deleteBtn;

// проверяем есть ли сохраненные данные в localStorage, если нет то присваиваем words пустой массив
localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem('words'));

const addEventDelete = () => {
    // провераяем не пустой ли массив 'words'
    if(words.length > 0) {
        /* только после проверки присваиваем переменной значение, 
        если сделать это раньше то может быть ошибка при пустом массиве */
        deleteBtn = document.querySelectorAll('.btn-delete');
        for(let btn of deleteBtn) {  // пробегаемся по всем кнопкам
            btn.addEventListener('click', e => {  // добавляем прослушку
                deleteWord(e);
            })
        }
    }
}

const addWordToTable = index => {  // words[index] - словарная пара - элемент массива
    table.innerHTML += `
        <tr class="tr-${index + 1}">
            <td class="eng-word">${words[index].english}</td>    
            <td class="rus-word">${words[index].russian}</td>
            <td class="">
                <button class="btn-delete"></button>
            </td>
        </tr>
    ` 
    addEventDelete();  // добавляем прослушку к новым созданным строкам
}

/* при перезагрузке страницы парсим данные хранящиеся в localStorage
'element' - элемент массива - словарная пара
'i' - индекс элемента в массиве 'words' */
words.forEach((element, i) => {
    addWordToTable(i);
});



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
        addWordToTable(words.length - 1);  // передаем индекс элемента массива
        engWord.value = null;   // очистка инпута
        rusWord.value = null;  // очистка инпута
    }
})

// функция конструктор для создании языковой пары 
function CreateWord (english, russian) {
    this.english = english;
    this.russian = russian;
}

const deleteWord = event => {   // удаление строки в которой кликнули кнопку 'delete'
    /*получаем доступ к ряду <tr> в котором мы кликнули кнопку
    и с помощтю свойства rowIndex - получаем индекс этого ряда - нумерация с нуля */
    const rowIndex = event.target.parentNode.parentNode.rowIndex;
        console.log(rowIndex);
    event.target.parentNode.parentNode.parentNode.remove();      // удаление строки из верстки

    // удаление элемента из массива
    words.splice(rowIndex, 1); // удаляем один элемент начиная с индекса равного rowIndex
    // перезаписываем localstorage 
    localStorage.removeItem('words');
    localStorage.setItem('words',JSON.stringify(words));
}

addEventDelete();

// document.querySelector('.tr-1').parentNode.remove();