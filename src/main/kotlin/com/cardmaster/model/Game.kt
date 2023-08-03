package com.cardmaster.model

import java.time.LocalDateTime

data class Game(
     val id: String? = null,
     val points: Map<String, Int>? = null,
     val fines: Map<String, Int>? = null,
     val isBock: Boolean = false,
     val isSolo: Boolean = false,
     private val startedAt: LocalDateTime,
     private val endedAt: LocalDateTime?
)
