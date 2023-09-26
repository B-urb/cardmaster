package com.cardmaster.util

class UserNotFoundException(val userId: String) : RuntimeException("User with ID $userId not found")

class UserAlreadyExistsException(val email: String) : RuntimeException("User with Mail $email found")