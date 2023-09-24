package com.cardmaster.routes

import com.cardmaster.model.GroupParams
import com.cardmaster.model.JoinParamsName
import com.cardmaster.model.PlayerGroup
import com.cardmaster.model.UserSession
import com.cardmaster.service.CardMasterService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.sessions.*
import org.koin.ktor.ext.inject


fun Routing.groupRoutes() {
    val cardMasterService by inject<CardMasterService>()

    route("group") {
        post("create") {
            val userId = call.sessions.get<UserSession>()!!.userId
            val group = call.receive<GroupParams>()
            val playerGroup = PlayerGroup(null, group.name)
            val groupCreated = cardMasterService.createGroup(playerGroup)

            val rel = cardMasterService.joinUserToGroup(userId, groupCreated.id!!)
            call.respond(HttpStatusCode.Created, groupCreated)
        }

        get("user/{id}") {
            if (call.parameters["id"] != null) {
                call.respond(cardMasterService.getUsersOfGroup(call.parameters["id"]!!))
            }
        }

        get {
            val user = call.sessions.get<UserSession>()!!.userId
            val groups = cardMasterService.getGroupsOfUser(user)
            call.respond(groups)
        }


        get("{userId") {
            val user = call.sessions.get<UserSession>()!!.userId
                val groups = cardMasterService.getGroupsOfUser(call.parameters["userId"]!!)
                call.respond(groups)
        }


        post("join") {
            //TODO: Sanitize input
            val data = call.receive<JoinParamsName>()
            //FIXME: Use Relationship when api is available
            val result =
                cardMasterService.joinUserToGroupByName(data.username, data.groupId)
            call.respond(HttpStatusCode.OK)
        }

    }

}