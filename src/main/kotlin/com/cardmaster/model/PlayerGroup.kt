package com.cardmaster.model

import kotlinx.serialization.Serializable

@Serializable
data class PlayerGroup(
    val id: String?,
    val name: String,
    val players: Set<String>? = null,
    val admin: Set<String>? = null
)
