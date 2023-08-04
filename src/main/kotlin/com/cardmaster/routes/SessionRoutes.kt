package com.cardmaster.routes

import com.cardmaster.model.GameSession
import com.cardmaster.model.PlayerGroup
import com.cardmaster.model.User
import com.cardmaster.service.CardMasterService
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject
import java.time.LocalDateTime
import java.util.*


fun Routing.sessionRoutes() {
    val cardMasterService by inject<CardMasterService>()

    route("session") {
        post("create") {
            val header = call.request.header("user")
            val group = call.receive<PlayerGroup>()
            val players = (group.players?.map { User(it, "test", "test") }) ?: emptySet() //FIXME

            //Get Players that sit in the group
            val result = cardMasterService.createSession(
                GameSession(
                    UUID.randomUUID().toString(),
                    emptySet(),
                    players.toSet(),
                    LocalDateTime.now(),
                    null
                )
            )
            call.respond(result)
        }
        post("end") {}
        get("list") {
            call.respond(cardMasterService.getSessions())
        }
    }
}