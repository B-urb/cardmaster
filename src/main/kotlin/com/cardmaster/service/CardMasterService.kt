package com.cardmaster.service

import com.cardmaster.model.Game
import com.cardmaster.model.GameSession
import com.cardmaster.model.Player
import com.cardmaster.model.PlayerGroup
import com.cardmaster.model.PlaysIn
import com.cardmaster.plugins.SurrealDatabase
import org.koin.core.component.KoinComponent
import org.koin.core.component.inject
import java.lang.IllegalStateException
import java.time.LocalDateTime
import java.util.*

class CardMasterService : KoinComponent {

    val dbClient by inject<SurrealDatabase>()
    fun createUser() {

    }

    fun getPlayers() {

    }

    fun getGames(): List<Game> {
        val games = dbClient.driver.select("game:", Game::class.java)
        return games
    }

    fun getSession() {

    }

    fun createGame(game: Game): Game {
        val player = Player(UUID.randomUUID().toString(), "Test", "User")
        val points = mapOf(player.id.toString() to 0)
        val fines = mapOf(player.id.toString() to 0)
        val game =
            Game(id = null, points = points, fines = fines, isBock = false, isSolo = false, LocalDateTime.now(), null)
        val createdGame = dbClient.driver.create("game:uuid()", game)
        return createdGame
    }

    fun endGame(id: String) {
        data class updateData(val endedAt: LocalDateTime)

        val endGame = dbClient.driver.update(id, updateData(LocalDateTime.now()))

    }

    fun createPlayer(player: Player): Player? {
        //TODO: Sanitize input
        return dbClient.driver.create("player:uuid()", player)
    }

    fun createGroup(group: PlayerGroup): PlayerGroup? {
        return dbClient.driver.create("group:uuid()", group)
    }

    fun joinPlayerToGroup(playerId: String, groupId: String, relation: PlaysIn): PlaysIn {

        //TODO: Sanitize input
        //FIXME: Use Relationship when api is available
        val result = dbClient.driver.query(
            """
                BEGIN TRANSACTION;
                RELATE ${playerId}->plays_in->${groupId} SET active = true;
              COMMIT TRANSACTION;
            """.trimMargin(), mapOf("active" to "true"), PlaysIn::class.java
        )
        if (result.size != 1) throw IllegalStateException("Exactly one relationship should be returned")
        if (result.first().result.size != 1) throw IllegalStateException("Exactly one relationship should be returned")
        return result.first().result.first()!!
    }

    fun createSession(gameSession: GameSession): GameSession {
        return dbClient.driver.create("session:uuid()", gameSession)
    }

    fun endSession() {

    }

    companion object {
        fun serializeDataClassToParams(clazz: Any) {

        }
    }
}