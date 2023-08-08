package com.cardmaster.service

import com.cardmaster.model.Game
import com.cardmaster.model.GameSession
import com.cardmaster.model.PlayerGroup
import com.cardmaster.model.PlaysIn
import com.cardmaster.model.User
import com.cardmaster.plugins.SurrealDatabase
import com.surrealdb.driver.model.QueryResult
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

    fun getGames(id: String): List<Game> {
        val result = dbClient.driver.query("select * from game where session = ${id}", emptyMap(), Game::class.java)
        return result.first().result
    }

    fun getSessions(id: String): List<GameSession> {
        val result =
            dbClient.driver.query("select * from session where table = ${id}", emptyMap(), GameSession::class.java)
        return result.first().result
    }

    fun createGame(game: Game): Game {
        val createdGame = dbClient.driver.create("game:rand()", game)
        return createdGame
    }

    fun endGame(id: String) {
        data class updateData(val endedAt: LocalDateTime)

        val endGame = dbClient.driver.update(id, updateData(LocalDateTime.now()))

    }

    fun createUser(user: User): User? {
        //TODO: Sanitize input
        return dbClient.driver.create("user:rand()", user)
    }

    fun createGroup(group: PlayerGroup): PlayerGroup {
        return dbClient.driver.create("group:rand()", group)
    }

    fun joinUserToGroup(playerId: String, groupId: String, relation: PlaysIn): MutableList<QueryResult<Map<*, *>>>? {

        //RELATE user:`${playerId}`->plays_in->${groupId} SET active = true;
        //TODO: Sanitize input
        //FIXME: Use Relationship when api is available
        val result = dbClient.driver.query(
            """
                BEGIN TRANSACTION;
               update ${playerId}  SET groups += ${groupId};
               update ${groupId}  SET players += ${playerId};
              COMMIT TRANSACTION;
            """.trimMargin(), emptyMap(), Map::class.java
        )
        //if (result.size != 1) throw IllegalStateException("Exactly one relationship should be returned")
        //if (result.first().result.size != 1) throw IllegalStateException("Exactly one relationship should be returned")
        return result
    }

    fun createSession(gameSession: GameSession): GameSession {
        return dbClient.driver.create("session:rand()", gameSession)
    }

    fun endSession() {

    }

    fun getUserOfGroup(groupId: String): List<User> {
        val result =
            dbClient.driver.query("select * from user where ${groupId} in groups", emptyMap(), User::class.java)
        return result.first().result

    }

    fun getGroupsOfUser(userId: String): List<PlayerGroup> {
        val result =
            dbClient.driver.query("select * from group where ${userId} in players", emptyMap(), PlayerGroup::class.java)
        //val result = dbClient.driver.query("select ->plays_in->group.* as group from user:`${userId}` split group", emptyMap(), Map::class.java)
        return result.first().result

    }

    companion object {
        fun serializeDataClassToParams(clazz: Any) {

        }
    }
}