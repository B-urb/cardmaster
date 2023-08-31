package com.cardmaster.plugins

import com.cardmaster.routes.gameRoutes
import com.cardmaster.routes.groupRoutes
import com.cardmaster.routes.sessionRoutes
import com.cardmaster.routes.userRoutes
import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {
        singlePageApplication {
            useResources = true
            filesPath = "dist"
            defaultPage = "index.html"
        }
        userRoutes()
        groupRoutes()
        gameRoutes()
        sessionRoutes()

    }

}



