const todoApp = {
    tasks:[
    { name: 'Task 1', isDone: false},
    { name: 'Task 2', isDone: false},
    { name: 'Task 3', isDone: false},
    { name: 'Task 4', isDone: false},
    { name: 'Task 5', isDone: false}
   ], // массив задач

    addTask(task) { // example of task: {name, isDone}

        const existingTask = this.tasks.find(e => e.name === task.name);
        if (!existingTask) {
            this.tasks.push(task)
        }
    },

    removeTask(taskName) {
        const index = this.tasks.findIndex(e => e.name === taskName);

        if (index !== -1) {
        this.tasks.splice(index, 1);
        } else {
            alert('Данного товара нет на складе');
        }
    }
};


add.onclick = addHandler;

function addHandler() {
    const name = TaskName.value.trim();
    
    if (name) {
        todoApp.addTask({ name, isDone: false });
    }
    TaskName.value = ''; //стираем значение input

    updateTotalList();
}

function updateTotalList() {
    tasksList.innerHTML = '';
    // 1. Перебор элементов массива
    todoApp.tasks.sort((a,b) => a.isDone - b.isDone).forEach((e, i) => {

        //console.log(stock.tasks.sort((a, b) => {
       // if (a.price === b.price) {
        //    return a.quantity - b.quantity
        //}
       // return a.price - b.price
    //}));
        // 2. При каждой итерации созд. HTML Element
        const li = document.createElement('li');
        li.classList.add("list-group-item", "list-group-item-action");

        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        // стилизуем кнопку с пом. Bootstrap
        removeButton.classList.add('btn', 'btn-danger', 'ms-2');

        removeButton.onclick = () => {
            // 1. Удаляем товар со склада 
            todoApp.removeTask(e.name);
            //2. Запуск функции обновления контента списка товаров
            li.remove();
            updateTotalList();
        };

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.classList.add('form-check-input', 'mx-2'); // здесь добавляем классы 
        // из Bootstrap элементу input с типом checkbox (настр. вид элемента)
        checkBox.checked = e.isDone; //  здесь связываем то, что хранится по  
        // атрибуту checked с тем, что хранится в массиве в поле isDone.

        if (checkBox.checked) {
            li.classList.add('list-group-item-secondary');
            li.style.textDecoration = 'line-through'
        }

        checkBox.onclick = () => {  // по клику на элемент checkBox
            e.isDone = !e.isDone; // меняем значение поля isChecked в массиве на противоположное
            updateTotalList(); // отрисовываем страницу с изменениями заново
        }

        // 3. Наделяем новый элемент текстовым контентом:

        li.textContent = `${i + 1}. Task name: ${e.name}`;

        // Home Work: добавляем кнопку в каждый элемент li списка productsList:
        li.appendChild(checkBox);
        li.appendChild(removeButton);

        // 4. Добавляем его в ProductsList:
        tasksList.appendChild(li);
    });
}

// stats.onclick = statsHandler;

// function statsHandler() {

//     const tasksCount = stock.tasks.length;
//     const totalCost = stock.totalCost;
//     const totalQuantity = stock.tasks.reduce((acc, task) => acc + task.quantity, 0);
//     // Итерирует элементы массива и меняет их на новое значение
//     const arrPrices = stock.tasks.map(e => e.price);
//     const maxPrice = Math.max(...arrPrices);
//     const minPrice = Math.min(...arrPrices);
//     const avgPrice = arrPrices.reduce((acc, task) => acc + task, 0) / arrPrices.length;

//     console.log(stock.tasks.sort((a, b) => a.price - b.price));
//     console.log(stock.tasks.sort((a, b) => a.quantity - b.quantity));
//     console.log(stock.tasks.sort((a, b) => a.name.length - b.name.length));

//     // сортируем по цене, а если цены равны, то по количеству:
//     console.log(stock.tasks.sort((a, b) => {
//         if (a.price === b.price) {
//             return a.quantity - b.quantity
//         }
//         return a.price - b.price
//     }));

//     statsList.innerHTML = `
//     <li class = "list-group-task list-group-task-action">
//         <p>Count of tasks: ${tasksCount}</p>
//         <p>Total cost: ${totalCost}</p>
//         <p>Total quantity: ${totalQuantity}</p>
//         <p>Maximum price: ${maxPrice}</p>
//         <p>Average price: ${avgPrice}</p>
//         <p>Minimum price: ${minPrice}</p>
//     </li>
//     `;
// }

// console.log(Math.random());
