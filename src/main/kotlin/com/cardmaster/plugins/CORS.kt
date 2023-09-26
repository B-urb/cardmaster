package com.cardmaster.plugins

import com.cardmaster.util.UserAlreadyExistsException
import com.cardmaster.util.UserNotFoundException
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.server.response.*


fun Application.configureCORS() {
    install(StatusPages) {
        exception<UserNotFoundException> { call, cause ->
            call.respond(HttpStatusCode.Unauthorized, cause.message ?: "User not found")
        }
        exception<UserAlreadyExistsException> { call, cause ->
            call.respond(HttpStatusCode.Conflict, cause.message ?: "User already exists")
        }
        exception<Throwable> { call, cause ->
            call.respondText(text = "500: $cause", status = HttpStatusCode.InternalServerError)
        }
    }
    install(CORS) {
        allowMethod(HttpMethod.Options)
        allowMethod(HttpMethod.Post)
        allowMethod(HttpMethod.Get)
        allowHeader(HttpHeaders.AccessControlAllowOrigin)
        allowHeader(HttpHeaders.ContentType)
        allowCredentials = true
        anyHost()
    }
}
