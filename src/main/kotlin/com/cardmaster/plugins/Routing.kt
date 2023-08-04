package com.cardmaster.plugins

import com.cardmaster.routes.gameRoutes
import com.cardmaster.routes.groupRoutes
import com.cardmaster.routes.sessionRoutes
import com.cardmaster.routes.userRoutes
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {
        userRoutes()
        groupRoutes()
        gameRoutes()
        sessionRoutes()
        get("/") {
            call.respondText("Hello World!")
        }

    }

}



