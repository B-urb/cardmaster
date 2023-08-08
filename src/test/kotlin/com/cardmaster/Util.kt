package com.cardmaster

import com.cardmaster.model.User
import java.util.*

class Util {
    fun createTestUser(): User {
        return User(UUID.randomUUID().toString(), "test", "test@mail.de", "password")
    }
}