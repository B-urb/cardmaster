package com.cardmaster.routes

import com.cardmaster.model.GroupParams
import com.cardmaster.model.JoinParams
import com.cardmaster.model.PlayerGroup
import com.cardmaster.model.PlaysIn
import com.cardmaster.service.CardMasterService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject
import java.time.LocalDate


fun Routing.groupRoutes() {
    val cardMasterService by inject<CardMasterService>()

    route("group") {
        post("create") {
            val userId = call.request.header("cardmaster-user")
            val group = call.receive<GroupParams>()
            val playerGroup = PlayerGroup("", group.name)
            val groupCreated = cardMasterService.createGroup(playerGroup)

            val rel = cardMasterService.joinUserToGroup(userId!!, groupCreated.id!!, PlaysIn())
            call.respond(HttpStatusCode.Created, groupCreated)
        }

        get {
            val userId = call.request.header("cardmaster-user")!!
            val groups = cardMasterService.getGroupsOfUser(userId)
            call.respond(groups)
        }


        get("{userId") {
            if (call.parameters["userId"] != null) {
                val userId = call.request.header("cardmaster-user")
                val groups = cardMasterService.getGroupsOfUser(call.parameters["userId"]!!)
                call.respond(groups)
            } else {
                call.respond(HttpStatusCode.BadRequest)
            }
        }


        post("join") {
            //TODO: Sanitize input
            val data = call.receive<JoinParams>()
            //FIXME: Use Relationship when api is available
            val result =
                cardMasterService.joinUserToGroup(data.playerId, data.groupId, PlaysIn(LocalDate.now(), true))
            call.respond(HttpStatusCode.OK)
        }

    }

}