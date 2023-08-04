package com.cardmaster.model

import com.cardmaster.util.DateSerializer
import kotlinx.serialization.Serializable
import java.time.LocalDateTime

@Serializable
data class Game(
     val id: String? = null,
     val players: Set<String>?,
     val points: Map<String, Int>? = null,
     val fines: Map<String, Int>? = null,
     val isBock: Boolean = false,
     val isSolo: Boolean = false,
     @Serializable(with = DateSerializer::class)
     private val startedAt: LocalDateTime,
     @Serializable(with = DateSerializer::class)
     private val endedAt: LocalDateTime? = null
)
