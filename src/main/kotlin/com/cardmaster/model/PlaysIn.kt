package com.cardmaster.model

import com.cardmaster.util.DateSerializer
import kotlinx.serialization.Serializable
import java.time.LocalDate

@Serializable
data class PlaysIn(
    @Serializable(with = DateSerializer::class)
    val joinDate: LocalDate,
    val active: Boolean = false
)
