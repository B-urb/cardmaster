package com.cardmaster.routes

import com.cardmaster.model.Game
import com.cardmaster.model.IdParams
import com.cardmaster.service.CardMasterService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject
import java.time.LocalDateTime


fun Routing.gameRoutes() {
    val cardMasterService by inject<CardMasterService>()

    route("game") {
        get("list") {

        }

        get("{id}") {
            if (call.parameters["id"] != null) {
                call.respond(cardMasterService.getGames(call.parameters["id"]!!))
            }
        }

        post("create") {
            val id = call.receive<IdParams>()
            val userId = call.request.header("cardmaster-user")!!
            //FIXME: use actual users
            val game = Game("", session = id.id, players = setOf(userId), startedAt = LocalDateTime.now())
            val gameCreated = cardMasterService.createGame(game)
            call.respond(HttpStatusCode.Created, gameCreated)
        }
        patch("end") {
            val id = call.receiveText()
            cardMasterService.endGame(id)
            call.respondText("Success")

        }
    }
}