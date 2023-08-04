package com.cardmaster.model

import com.cardmaster.util.DateSerializer
import kotlinx.serialization.Serializable
import java.time.LocalDateTime

@Serializable
data class GameSession(
    private val id: String?,
    private val games: Set<Game>,
    private val players: Set<User>,

    @Serializable(with = DateSerializer::class)
    private val startedAt: LocalDateTime,

    @Serializable(with = DateSerializer::class)
    private val endedAt: LocalDateTime?
)