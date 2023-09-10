package com.cardmaster.util

import com.cardmaster.model.DoppelkopfWinner
import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.Serializer
import kotlinx.serialization.descriptors.PrimitiveKind
import kotlinx.serialization.descriptors.PrimitiveSerialDescriptor
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder

@Suppress("EXTERNAL_SERIALIZER_USELESS")
@OptIn(ExperimentalSerializationApi::class)
@Serializer(forClass = DoppelkopfWinner::class)
class WinnerSerializer {
    override val descriptor: SerialDescriptor = PrimitiveSerialDescriptor("Winner", PrimitiveKind.INT)
    override fun serialize(encoder: Encoder, value: DoppelkopfWinner) {
        val ordinal = when (value) {
            DoppelkopfWinner.RE -> 0
            DoppelkopfWinner.Contra -> 1
        }
        encoder.encodeInt(ordinal)
    }

    override fun deserialize(decoder: Decoder): DoppelkopfWinner {
        val ordinal = decoder.decodeString()
        return when (ordinal) {
            "0", "RE" -> DoppelkopfWinner.RE
            "1", "CONTRA" -> DoppelkopfWinner.Contra
            else -> throw IllegalStateException("No Winner for enum $ordinal")
        }
    }
}