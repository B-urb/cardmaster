package com.cardmaster

import com.cardmaster.plugins.configureInjection
import com.cardmaster.plugins.configureRouting
import com.cardmaster.plugins.configureSerialization
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.testing.*
import org.junit.After
import org.koin.core.context.GlobalContext
import kotlin.test.Test
import kotlin.test.assertEquals

class UserTest {
    @Test
    fun testUser() = testApplication {

        val client = createClient {
            install(ContentNegotiation) {
                json()
            }
        }
        application {
            configureSerialization()
            configureInjection()
            configureRouting()
        }

        client.get("/user/list").apply {
            //val games = call.body<Game>()
            assertEquals(HttpStatusCode.OK, status)
        }
    }

    @After
    fun stopKoinAfterTest() = GlobalContext.stopKoin()
}