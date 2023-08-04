package com.cardmaster.routes

import com.cardmaster.model.User
import com.cardmaster.service.CardMasterService
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject


fun Routing.userRoutes() {
    val cardMasterService by inject<CardMasterService>()

    route("user") {
        get("list") {
            call.respond(cardMasterService.listUsers())
        }

        post("create") {
            val playerInfo = call.receive<User>()
            //TODO: Sanitize input
        }
    }
}