package com.cardmaster

import com.cardmaster.modules.surrealDBClient
import com.cardmaster.plugins.*
import com.surrealdb.driver.SyncSurrealDriver
import io.ktor.server.application.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import org.koin.java.KoinJavaComponent.inject
import org.koin.ktor.ext.inject
import org.koin.ktor.plugin.Koin

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
    configureTemplating()
    configureRouting()

}
