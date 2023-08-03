package com.cardmaster.model

import java.time.LocalDate

data class PlaysIn(
    val joinDate: LocalDate,
    val active: Boolean = false
)
