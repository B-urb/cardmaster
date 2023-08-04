package com.cardmaster.service

import com.cardmaster.model.Game
import com.cardmaster.model.GameSession
import com.cardmaster.model.PlayerGroup
import com.cardmaster.model.PlaysIn
import com.cardmaster.model.User
import com.cardmaster.plugins.SurrealDatabase
import org.koin.core.component.KoinComponent
import org.koin.core.component.inject
import java.time.LocalDateTime

class CardMasterService : KoinComponent {

    val dbClient by inject<SurrealDatabase>()
    fun createUser() {

    }

    fun listUsers() {

    }

    fun getPlayer(id: String): User? {
        return dbClient.driver.select(id, User::class.java).first() ?: throw IllegalStateException("User not found")
    }

    fun getGames(): List<Game> {
        val games = dbClient.driver.select("game", Game::class.java).toList()
        return games
    }

    fun getSessions(): List<GameSession> {
        val session = dbClient.driver.select("session:", GameSession::class.java)
        return session
    }

    fun createGame(game: Game): Game {
        val createdGame = dbClient.driver.create("game:uuid()", game)
        return createdGame
    }

    fun endGame(id: String) {
        data class updateData(val endedAt: LocalDateTime)

        val endGame = dbClient.driver.update(id, updateData(LocalDateTime.now()))

    }

    fun createPlayer(player: User): User? {
        //TODO: Sanitize input
        return dbClient.driver.create("player:uuid()", player)
    }

    fun createGroup(group: PlayerGroup): PlayerGroup {
        return dbClient.driver.create("group:uuid()", group)
    }

    fun jointUserToGroup(playerId: String, groupId: String, relation: PlaysIn): PlaysIn {

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