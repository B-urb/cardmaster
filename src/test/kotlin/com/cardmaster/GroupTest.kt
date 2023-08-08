package com.cardmaster

import com.cardmaster.model.GroupParams
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
import java.util.*
import kotlin.test.Test
import kotlin.test.assertEquals

class GroupTest {
    @Test
    fun testGroup() = testApplication {

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



        client.post("/group/create") {
            headers {
                header(HttpHeaders.ContentType, ContentType.Application.Json)
                header("cardmaster-user", UUID.randomUUID().toString())
            }
            contentType(ContentType.Application.Json)
            setBody(
                GroupParams("test-group")
            )
        }.apply {
            assertEquals(HttpStatusCode.Created, status)
        }
    }

    @After
    fun stopKoinAfterTest() = GlobalContext.stopKoin()
}