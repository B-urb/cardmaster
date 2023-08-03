package com.cardmaster.model

import java.util.UUID

data class PlayerGroup(val id: String, val players: Set<String>? = null, val admin: Set<String>? = null)
