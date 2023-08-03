package com.cardmaster.plugins

import com.cardmaster.service.CardMasterService
import io.ktor.server.application.*
import org.koin.core.module.dsl.singleOf
import org.koin.dsl.module
import org.koin.ktor.plugin.Koin
import org.koin.logger.slf4jLogger

val dbModule = module {
    singleOf(::SurrealDatabase)
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
