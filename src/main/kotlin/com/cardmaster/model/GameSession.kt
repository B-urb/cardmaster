package com.cardmaster.model

import java.time.LocalDate
import java.time.LocalDateTime
import java.util.UUID

data class GameSession(
    private val id: UUID,
    private val date: LocalDate,
    private val games: Set<Game>,
    private val players: Set<Player>,
    private val startedAt: LocalDateTime,
    private val endedAt: LocalDateTime?
)