package com.cardmaster.routes

import com.cardmaster.model.GroupParams
import com.cardmaster.model.PlayerGroup
import com.cardmaster.model.PlaysIn
import com.cardmaster.service.CardMasterService
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject
import java.time.LocalDate
import java.util.*


fun Routing.groupRoutes() {
    val cardMasterService by inject<CardMasterService>()

    route("group") {
        post("create") {
            val userId = call.request.header("cardmaster-user")
            val group = call.receive<GroupParams>()
            val playerGroup = PlayerGroup(UUID.randomUUID().toString(), group.name, setOf(userId!!), setOf(userId))
            val groupCreated = cardMasterService.createGroup(playerGroup)

            call.respond(groupCreated)
        }

        post("join") {
            data class dataDto(val playerId: String, val groupId: String)
            //TODO: Sanitize input
            val data = call.receive<dataDto>()
            //FIXME: Use Relationship when api is available
            val result =
                cardMasterService.jointUserToGroup(data.playerId, data.groupId, PlaysIn(LocalDate.now(), true))
            call.respond(result)
        }

    }

}