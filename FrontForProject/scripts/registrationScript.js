document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const backendUrl = 'http://localhost:8080';

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const data = {
            email: email,
            password: password
        };

        fetch(`${backendUrl}/register`, {
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
                alert(data.message); // Показываем сообщение об успешной регистрации
                // Перенаправление на страницу входа
                window.location.href = 'index.html';
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error.message || 'Произошла ошибка при регистрации');
                window.location.href = 'index.html';
            });
    });
});