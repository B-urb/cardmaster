package com.cardmaster.model

import kotlinx.serialization.Serializable

@Serializable
data class User(
    val id: String?,
    val username: String,
    val mail: String,
    val password: String,
    val groups: Set<String> = emptySet()
    )
