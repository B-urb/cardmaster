package com.cardmaster.plugins

import com.cardmaster.service.CardMasterService
import com.typesafe.config.ConfigFactory
import io.ktor.server.application.*
import org.koin.dsl.module
import org.koin.ktor.plugin.Koin
import org.koin.logger.slf4jLogger

val dbModule = module {
    val config = ConfigFactory.load()
    single<SurrealDatabase> { SurrealDatabase(config.getString("ktor.db.password"), "root", "club", "cardmaster") }
}
val serviceModule = module {
    single<CardMasterService> {
        CardMasterService()
    }
}

fun Application.configureInjection() {
    install(Koin) {
        slf4jLogger()
        modules(dbModule, serviceModule)
    }
}
