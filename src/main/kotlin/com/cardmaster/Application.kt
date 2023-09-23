package com.cardmaster

import com.cardmaster.plugins.configureCORS
import com.cardmaster.plugins.configureInjection
import com.cardmaster.plugins.configureMonitoring
import com.cardmaster.plugins.configureRouting
import com.cardmaster.plugins.configureSecurity
import com.cardmaster.plugins.configureSerialization
import com.cardmaster.plugins.configureTemplating
import io.ktor.server.application.*

fun main(args: Array<String>) {
    io.ktor.server.cio.EngineMain.main(args)
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
