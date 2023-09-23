package com.cardmaster.plugins

import com.surrealdb.connection.SurrealWebSocketConnection
import com.surrealdb.driver.SyncSurrealDriver

class SurrealDatabase(val password: String, val username: String, val database: String, val namespace: String) {
    val driver: SyncSurrealDriver

    init {

        val conn = SurrealWebSocketConnection("localhost", 8000, false)
        conn.connect(5)
        this.driver = SyncSurrealDriver(conn)
        this.driver.signIn(username, password)
        this.driver.use(namespace, database)
    }
}
