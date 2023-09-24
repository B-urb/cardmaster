package com.cardmaster.routes

import com.cardmaster.model.Game
import com.cardmaster.model.GameUpdate
import com.cardmaster.model.IdParams
import com.cardmaster.model.UserSession
import com.cardmaster.service.CardMasterService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.sessions.*
import org.koin.ktor.ext.inject
import java.time.LocalDateTime


fun Routing.gameRoutes() {
    val cardMasterService by inject<CardMasterService>()

    route("game") {
        get("list") {

        }
        get("1/{id}") {
            if (call.parameters["id"] != null) {
                call.respond(cardMasterService.getGameById(call.parameters["id"]!!))
            }
        }
        get("{id}") {
            if (call.parameters["id"] != null) {
                call.respond(cardMasterService.getGames(call.parameters["id"]!!))
            }
        }

        post("update") {
            val game = call.receive<GameUpdate>()
            val userId = call.sessions.get<UserSession>()!!.userId
            val gameCreated = cardMasterService.updateGame(game)
            call.respond(HttpStatusCode.Created, gameCreated)
        }

        post("create") {
            val id = call.receive<IdParams>()
            val userId = call.sessions.get<UserSession>()!!.userId
            val users = cardMasterService.getUsersOfSession(id.id).map { it.id }
            val fines = users.map { it to 0 }.toMap()
            val points = users.map { it to 0 }.toMap()

            //FIXME: use actual users
            val game = Game(
                null,
                session = id.id,
                players = users.toSet(),
                fines = fines,
                points = points,
                startedAt = LocalDateTime.now()
            )
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