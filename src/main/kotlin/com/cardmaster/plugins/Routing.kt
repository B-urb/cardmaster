package com.cardmaster.plugins

import com.cardmaster.model.Game
import com.cardmaster.model.GameSession
import com.cardmaster.model.Player
import com.cardmaster.model.PlayerGroup
import com.cardmaster.model.PlaysIn
import com.cardmaster.service.CardMasterService
import com.surrealdb.driver.SyncSurrealDriver
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject
import org.koin.logger.SLF4JLogger
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.*
import javax.swing.GroupLayout.Group


fun Application.configureRouting() {
    val dbClient by inject<SurrealDatabase>()
    val logger by inject<SLF4JLogger>()
    val cardMasterService by inject<CardMasterService>()

    install(StatusPages) {
        exception<Throwable> { call, cause ->
            call.respondText(text = "500: $cause", status = HttpStatusCode.InternalServerError)
        }
    }
    routing {
        get("/") {
            call.respondText("Hello World!")
        }
        get("/players/list") {
            call.respond(cardMasterService.getPlayers())
        }
        get("/game/list") {
            call.respond(cardMasterService.getGames())
        }
        get("session/get") {
            call.respond(cardMasterService.getSession())
        }
        post("/game/create") {
            val gameInfo = call.receive<Game>()
            val gameCreated = cardMasterService.createGame(gameInfo)
            call.respond(gameCreated)

        }
        patch("game/end") {
            val id = call.receiveText()
            cardMasterService.endGame(id)
            call.respondText("Success")

        }
        post("/player/create") {
            val playerInfo = call.receive<Player>()
            //TODO: Sanitize input
            val player = dbClient.driver.create("player:uuid()", playerInfo)
        }
        post("/group/create") {
            val group = call.receive<PlayerGroup>()
            val groupCreated = dbClient.driver.create("group:uuid()", group)
            call.respond(groupCreated)
        }

        post("/group/join") {
            data class dataDto(val playerId: String, val groupId: String)
            //TODO: Sanitize input
            val data = call.receive<dataDto>()
            //FIXME: Use Relationship when api is available
            val result =
                cardMasterService.joinPlayerToGroup(data.playerId, data.groupId, PlaysIn(LocalDate.now(), true))
            call.respond(result)
        }
        post("/session/create") {
            val group = call.receive<PlayerGroup>()
            val players = (group.players?.map { Player(it, "test", "test") }) ?: emptySet() //FIXME

            //Get Players that sit in the group
            val result = cardMasterService.createSession(
                GameSession(
                    UUID.randomUUID(),
                    LocalDate.now(),
                    emptySet(),
                    players.toSet(),
                    LocalDateTime.now(),
                    null
                )
            )
            call.respond(result)
        }
        post("/session/end") {}
    }

}
