package com.cardmaster

import com.cardmaster.plugins.configureCORS
import com.cardmaster.plugins.configureInjection
import com.cardmaster.plugins.configureMonitoring
import com.cardmaster.plugins.configureRouting
import com.cardmaster.plugins.configureSecurity
import com.cardmaster.plugins.configureSerialization
import com.cardmaster.plugins.configureTemplating
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*

fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0", module = Application::module)
        .start(wait = true)

}

data class Game(
    val points: Int
)

fun Application.module() {
    configureInjection()
    configureSecurity()
    configureMonitoring()
    configureSerialization()
    configureCORS()
    configureTemplating()
    configureRouting()

}
