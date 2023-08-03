package com.cardmaster.modules

import com.surrealdb.connection.SurrealWebSocketConnection
import com.surrealdb.driver.SyncSurrealDriver
import org.koin.dsl.module


val surrealDBClient = module {
    single<SyncSurrealDriver> {
        val conn = SurrealWebSocketConnection("localhost", 8000, false)
        conn.connect(5)
        println("Database is connected: ${conn.isOpen}")
        val driver = SyncSurrealDriver(conn)
        driver.signIn("root", "root")
        driver.use("cardmaster", "main")
        driver
    }
}
