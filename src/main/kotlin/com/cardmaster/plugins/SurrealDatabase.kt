package com.cardmaster.plugins

import com.surrealdb.connection.SurrealWebSocketConnection
import com.surrealdb.driver.SyncSurrealDriver

class SurrealDatabase() {
    val driver: SyncSurrealDriver

    init {

        val conn = SurrealWebSocketConnection("localhost", 8000, false)
        conn.connect(5)
        this.driver = SyncSurrealDriver(conn)
        this.driver.signIn("root", "root")
        this.driver.use("cardmaster", "club")
    }

}