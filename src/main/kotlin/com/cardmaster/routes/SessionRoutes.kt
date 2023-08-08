package com.cardmaster.routes

import com.cardmaster.model.GameSession
import com.cardmaster.model.IdParams
import com.cardmaster.service.CardMasterService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject
import java.time.LocalDateTime


fun Routing.sessionRoutes() {
    val cardMasterService by inject<CardMasterService>()

    route("session") {
        get("{id}") {
            if (call.parameters["id"] != null) {
                call.respond(cardMasterService.getSessions(call.parameters["id"]!!))
            }
        }
        post("create") {
            val user = call.request.header("cardmaster-user")!!
            val id = call.receive<IdParams>()

            val players = cardMasterService.getUserOfGroup(id.id).map { it.id!! }.toSet()

            //Get Players that sit in the group
            val result = cardMasterService.createSession(
                GameSession(
                    "",
                    emptySet(),
                    players,
                    id.id,
                    LocalDateTime.now(),
                    null
                )
            )
            call.respond(HttpStatusCode.Created, IdParams(result.id!!))
        }
        post("end") {}
        get("list") {
        }
    }
}