document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('authorizationForm');
    const backendUrl = 'http://localhost:8080';
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const data = {
            email: email,
            password: password
        };
        console.log('Отправляемые данные:', data);

        fetch(`${backendUrl}/authorization`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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
                alert(data.message); // Показываем сообщение об успешном логине
                localStorage.setItem('userEmail', email);
                if (data.Role === 'IsAdmin') {
                    // Перенаправление на страницу администратора (замените 'admin.html' на реальный путь)
                    window.location.href = 'AdminPage.html';
                } else if (data.Role === 'IsUser') {
                    // Перенаправление на страницу пользователя (замените 'user.html' на реальный путь, если нужно)
                    window.location.href = 'WorkerPage.html';
                }
                else {
                    window.location.href = 'Registration.html';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Произошла ошибка при авторизации.');
            });
    });
});