package com.example.demo.db;

import org.springframework.data.jpa.repository.JpaRepository;

//Создаем интерфейс для операций. Наследуем базовые методы JpaRepository и добавляем свои
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    boolean existsByEmail(String email);
}
