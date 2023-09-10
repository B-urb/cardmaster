package com.cardmaster.service

import com.cardmaster.model.Game
import com.cardmaster.model.GameSession
import com.cardmaster.model.GameUpdate
import com.cardmaster.model.PlayerGroup
import com.cardmaster.model.User
import com.cardmaster.model.UserSparse
import com.cardmaster.plugins.SurrealDatabase
import org.koin.core.component.KoinComponent
import org.koin.core.component.inject
import java.time.LocalDateTime

class CardMasterService : KoinComponent {

    val dbClient by inject<SurrealDatabase>()


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

    fun getSessionById(id: String): GameSession {
        val result =
            dbClient.driver.select("$id", GameSession::class.java)
        return result.first()
    }

    fun getGameById(id: String): Game {
        val result =
            dbClient.driver.select("$id", Game::class.java)
        return result.first()
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
        val hash = dbClient.driver.query(
            "SELECT * FROM crypto::scrypt::generate('${user.password}')",
            emptyMap(), String::class.java
        ).first().result.first()
        val persistUser = user.copy(password = hash)
        return dbClient.driver.create("user:rand()", persistUser)
    }

    fun login(user: User): String {
        val savedUser =
            dbClient.driver.query(
                "SELECT * from user where username = '${user.username}'",
                emptyMap(),
                User::class.java
            ).first().result.first()
                ?: throw NoSuchElementException("User not found")
        val passwordCorrect = dbClient.driver.query(
            "SELECT * FROM crypto::scrypt::compare('${savedUser.password}','${user.password}')",
            emptyMap(), String::class.java
        ).first().result.first()
        if (passwordCorrect.toBoolean()) return savedUser.id!! else throw IllegalStateException("Password check failed")
    }

    fun createGroup(group: PlayerGroup): PlayerGroup {
        return dbClient.driver.create("group:rand()", group)
    }

    fun joinUserToGroupByName(username: String, groupId: String) {
        val playerId =
            dbClient.driver.query("select id from user where username = '$username'", emptyMap(), Map::class.java)
                .first().result.first().get("id")
        joinUserToGroup(playerId as String, groupId)
    }

    fun joinUserToGroup(playerId: String, groupId: String) {
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

    fun getUsersOfSession(id: String): List<UserSparse> {
        val ids =
            dbClient.driver.query("select players from session where id = '${id}'", emptyMap(), Map::class.java)
                .first().result.first().get("players")
        val result =
            dbClient.driver.query("select id, username from user where id in $ids", emptyMap(), UserSparse::class.java)
        return result.first().result
    }

    fun getUsersOfGroup(id: String): List<UserSparse> {
        val ids =
            dbClient.driver.query("select players from group where id = '${id}'", emptyMap(), Map::class.java)
                .first().result.first().get("players")
        val result =
            dbClient.driver.query("select id, username from user where id in $ids", emptyMap(), UserSparse::class.java)
        return result.first().result
    }

    fun updateGame(game: GameUpdate) {
        val savedGame = dbClient.driver.select(game.id, Game::class.java).first()
        val updateGame = savedGame.copy(
            fines = game.fines,
            points = game.points,
            winningTeam = game.winningTeam,
            winners = game.winners
        )
        dbClient.driver.update(game.id, updateGame)
    }

    companion object {
        fun serializeDataClassToParams(clazz: Any) {

        }
    }
}