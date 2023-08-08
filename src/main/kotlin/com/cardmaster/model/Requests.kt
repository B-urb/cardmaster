package com.cardmaster.model

import kotlinx.serialization.Serializable

@Serializable
data class GroupParams(val name: String)

@Serializable
data class IdParams(val id: String)


@Serializable
data class JoinParams(val playerId: String, val groupId: String)
