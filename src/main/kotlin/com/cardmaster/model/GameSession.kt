package com.cardmaster.model

import com.cardmaster.util.DateSerializer
import kotlinx.serialization.Serializable
import java.time.LocalDateTime

@Serializable
data class GameSession(
    val id: String?,
    val games: Set<String>,
    val players: Set<String>,
    val table: String,

    @Serializable(with = DateSerializer::class)
    val startedAt: LocalDateTime,

    @Serializable(with = DateSerializer::class)
    val endedAt: LocalDateTime?
)