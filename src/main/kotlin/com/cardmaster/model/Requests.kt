package com.cardmaster.model

import kotlinx.serialization.Serializable

@Serializable
data class GroupParams(val name: String)

@Serializable
data class GameParams(val id: String)
