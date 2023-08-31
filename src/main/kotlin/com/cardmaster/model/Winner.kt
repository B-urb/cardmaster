package com.cardmaster.model

interface Winner {
}

enum class DoppelkopfWinner : Winner {
    RE,
    Contra
}