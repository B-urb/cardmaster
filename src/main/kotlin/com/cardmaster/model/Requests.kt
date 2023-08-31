package com.cardmaster.model

import kotlinx.serialization.Serializable

@Serializable
data class GroupParams(val name: String)

@Serializable
data class IdParams(val id: String)

@Serializable
data class GameUpdate(val id: String, val points: Map<String, Int>, val fines: Map<String, Int>)


@Serializable
data class UserSparse(val id: String, val username: String)
@Serializable
data class JoinParams(val playerId: String, val groupId: String)

@Serializable
data class JoinParamsName(val username: String, val groupId: String)

@Serializable
data class RegisterData(val username: String, val email: String, val password: String, val confirmPassword: String)

@Serializable
data class LoginData(val username: String, val password: String)

@Serializable
data class UserSession(val userId: String, val isAuthenticated: Boolean)
