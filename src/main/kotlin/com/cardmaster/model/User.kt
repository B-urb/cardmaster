package com.cardmaster.model

import kotlinx.serialization.Serializable

@Serializable
data class User(
    val id: String?,
    val firstName: String,
    val lastName: String,

    )
