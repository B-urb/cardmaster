package com.cardmaster.routes

import com.cardmaster.model.LoginData
import com.cardmaster.model.RegisterData
import com.cardmaster.model.User
import com.cardmaster.model.UserSession
import com.cardmaster.service.CardMasterService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.sessions.*
import org.koin.ktor.ext.inject


fun Routing.userRoutes() {
    val cardMasterService by inject<CardMasterService>()


    post("register") {
        val register = call.receive<RegisterData>()
        val user = User(null, register.username, register.email, register.password, emptySet())
        val userCreated = cardMasterService.createUser(user)
        call.respond(userCreated!!)
    }
    post("login") {
        val register = call.receive<LoginData>()
        val user = User("", username = register.username, password = register.password, mail = "")
        val userId = cardMasterService.login(user)
        call.sessions.set(UserSession(userId = userId, isAuthenticated = true))
        call.respond("Successfully logged in")
    }
    get("loginc") {
        println("test")
        if (call.sessions.get<UserSession>() != null) call.respond(HttpStatusCode.OK) else call.respond(HttpStatusCode.Unauthorized)
    }

    route("user") {
        get("list") {
            call.respond(cardMasterService.listUsers())
        }

        post("create") {
            val playerInfo = call.receive<User>()
            //TODO: Sanitize input
        }
    }
}