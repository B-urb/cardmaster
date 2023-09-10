package com.cardmaster

import com.cardmaster.model.IdParams
import com.cardmaster.plugins.configureInjection
import com.cardmaster.plugins.configureRouting
import com.cardmaster.plugins.configureSerialization
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.testing.*
import org.junit.After
import org.koin.core.context.GlobalContext.stopKoin
import org.koin.test.KoinTest
import java.util.*
import kotlin.test.Test
import kotlin.test.assertEquals


class GameTest : KoinTest {

    @Test
    fun testGame() = testApplication {

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


        client.post("/game/create") {
            headers {
                header(HttpHeaders.ContentType, ContentType.Application.Json)
                header("cardmaster-user", UUID.randomUUID().toString())
            }
            contentType(ContentType.Application.Json)
            setBody(
                IdParams(UUID.randomUUID().toString())
            )
        }.apply {
            assertEquals(HttpStatusCode.Created, status)
        }
    }

    @After
    fun stopKoinAfterTest() = stopKoin()
}