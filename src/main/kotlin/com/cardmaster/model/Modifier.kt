package com.cardmaster.model

data class Modifier(private val modificationTarget: String, val operation: (Int) -> (Int))

