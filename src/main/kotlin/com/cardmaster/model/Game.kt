package com.cardmaster.model

import com.cardmaster.util.DateSerializer
import kotlinx.serialization.Serializable
import java.time.LocalDateTime

@Serializable
data class Game(
     val id: String? = null,
     val players: Set<String> = emptySet(),
     val session: String,
     val points: Map<String, Int> = emptyMap(),
     val fines: Map<String, Int> = emptyMap(),
     val isBock: Boolean = false,
     val isSolo: Boolean = false,
     @Serializable(with = DateSerializer::class)
     private val startedAt: LocalDateTime,
     @Serializable(with = DateSerializer::class)
     private val endedAt: LocalDateTime? = null
)
