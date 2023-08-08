package com.cardmaster.model

import kotlinx.serialization.Serializable

@Serializable
data class PlayerGroup(
    val id: String?,
    val name: String,
    val players: Set<String> = emptySet(),
    val admins: Set<String> = emptySet()
)
