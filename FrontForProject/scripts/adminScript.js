const workerSelect = document.getElementById('workerSelect');
const taskInput = document.getElementById('taskInput');
const sendTaskButton = document.getElementById('sendTaskButton');
const deleteWorkerButton = document.getElementById('deleteWorkerButton');

//старая версия
// // Функция для получения списка сотрудников с сервера
// function getWorkers() {
//     fetch('/workers') // Замените на реальный эндпоинт бэка
//         .then(response => response.json())
//         .then(workers => {
//             // Заполнение списка сотрудников
//             workers.forEach(worker => {
//                 const option = document.createElement('option');
//                 option.value = worker.email;
//                 option.textContent = worker.email;
//                 option.style.cursor = 'pointer';
//                 option.style.textDecoration = 'underline';
//                 option.addEventListener('mouseover', () => {
//                     option.style.backgroundColor = 'rgba(200, 200, 200, 0.5)';
//                 });
//                 option.addEventListener('mouseout', () => {
//                     option.style.backgroundColor = '';
//                 });
//                 workerSelect.appendChild(option);
//             });
//         })
//         .catch(error => console.error('Ошибка при получении списка сотрудников:', error));
// }
//
// // Вызываем функцию для получения списка сотрудников при загрузке страницы
// getWorkers();

async function loadWorkers() {
    try {
        const backendUrl = 'http://localhost:8080';
        const response = await fetch(`${backendUrl}/workers`);
        if (!response.ok) {
            throw new Error('Ошибка сети');
        }
        const workers = await response.json();

        // Очищаем select перед добавлением новых данных
        workerSelect.innerHTML = '';

        // Добавляем каждого работника в select
        workers.forEach(email => {
            const option = document.createElement('option');
            option.value = email;
            option.textContent = email;
            option.style.cursor = 'pointer';
            option.style.textDecoration = 'underline';
            option.addEventListener('mouseover', () => {
                option.style.backgroundColor = 'rgba(200, 200, 200, 0.5)';
            });
            option.addEventListener('mouseout', () => {
                option.style.backgroundColor = '';
            });
            workerSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Ошибка загрузки списка работников:', error);
    }
}

// Загружаем список работников при загрузке страницы
document.addEventListener('DOMContentLoaded', loadWorkers);

sendTaskButton.addEventListener('click', async () => {
    const selectedWorkerEmail = workerSelect.value;
    const taskText = taskInput.value;

    if (taskText.trim() === '') {
        alert('Пожалуйста, введите текст задачи.');
        return;
    }

    const data = {
        workerEmail: selectedWorkerEmail,
        taskText: taskText
    };
    console.log('Отправляемые данные:', data);

    try {
        const backendUrl = 'http://localhost:8080';
        const response = await fetch(`${backendUrl}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                workerEmail: selectedWorkerEmail,
                taskText: taskText
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        alert('Задача успешно отправлена!');
        taskInput.value = '';
    } catch (error) {
        console.error('Ошибка при отправке задачи:', error);
        alert('Ошибка при отправке задачи.');
    }
});

deleteWorkerButton.addEventListener('click', async () => {
    const selectedWorkerEmail = workerSelect.value;

    const data = {
        workerEmail: selectedWorkerEmail,
    };

    try {
        const backendUrl = 'http://localhost:8080';
        const response = await fetch(`${backendUrl}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                workerEmail: selectedWorkerEmail,
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        alert('Удаление произошло успешно!');
        await loadWorkers(); // Обновляем список работников после удаления
    } catch (error) {
        console.error('Ошибка при удалении:', error);
        alert('Ошибка при удалении.');
    }
});
