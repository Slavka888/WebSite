// document.addEventListener('DOMContentLoaded', () => {
//     const tasksList = document.getElementById('tasksList');
//
//     // Функция для получения задач пользователя
//     async function fetchUserTasks() {
//         // Получаем email пользователя из localStorage
//         const userEmail = localStorage.getItem('userEmail');
//
//         // Проверяем, есть ли email пользователя
//         if (!userEmail) {
//             console.error('Email пользователя не найден в localStorage.');
//             return;
//         }
//
//
//
//         try {
//             // Отправляем запрос на сервер для получения задач пользователя
//             const tasksResponse = await fetch(`http://localhost:8080/getTasks?email=${userEmail}`);
//             const tasks = await tasksResponse.json();
//
//             // Отображаем задачи на странице
//             displayTasks(tasks);
//         } catch (error) {
//             console.error('Ошибка при получении задач:', error);
//         }
//     }
//
//     // Функция для отображения задач
//     function displayTasks(tasks) {
//         tasksList.innerHTML = ''; // Очищаем предыдущие задачи
//
//         if (tasks.length === 0) {
//             tasksList.textContent = 'Нет задач для отображения.';
//             return;
//         }
//
//         tasks.forEach(task => {
//             const taskElement = document.createElement('div');
//             taskElement.classList.add('task-item'); // Можно добавить класс для стилизации
//
//             // Добавляем текст задачи
//             taskElement.textContent = task.text; // Предполагается, что у задачи есть поле text
//
//             tasksList.appendChild(taskElement);
//         });
//     }
//
//     // Вызываем функцию для получения задач при загрузке страницы
//     fetchUserTasks();
// });

document.addEventListener('DOMContentLoaded', function () {
    const email = localStorage.getItem('userEmail') || 'user@example.com'; // Замени на реальный способ получения email
    const backendUrl = 'http://localhost:8080';

    fetch(`${backendUrl}/getTasks?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errData => {
                    throw new Error(errData.message || 'Network response was not ok');
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            const taskDisplay = document.getElementById('tasksList');
            if (data.task) {
                taskDisplay.textContent = data.task; // Отображаем задачу
            } else {
                taskDisplay.textContent = data.message || 'Нет задач...'; // Сообщение, если задач нет
            }
        })
        .catch(error => {
            console.error('Error:', error);
            const taskDisplay = document.getElementById('taskList');
            taskDisplay.textContent = error.message || 'Error loading task';
        });
});

// Получаем кнопку и область задач
const finishTaskButton = document.getElementById('finishTaskButton');
const tasksList = document.getElementById('tasksList');

// Обработчик нажатия на кнопку "Выполнено"
finishTaskButton.addEventListener('click', () => {
    const email = localStorage.getItem('userEmail') || 'user@example.com'; // Замени на реальный способ получения email
    const backendUrl = 'http://localhost:8080';

    fetch(`${backendUrl}/deleteTasks?email=${encodeURIComponent(email)}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errData => {
                    throw new Error(errData.message || 'Network response was not ok');
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            const taskDisplay = document.getElementById('tasksList');
            taskDisplay.textContent = "Нет задач..."; // Отображаем задачу
        })
    console.log("Задачи очищены")
});

//дописать, чтобы сообщение о завершении задачи отправлялось админу