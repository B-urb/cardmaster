import axios from "axios";

export const CREATE_GAME = "/game/create"
export const GET_GAMES = "game/list"
export const GET_SESSIONS = "/session/list"
export const CREATE_SESSION = "session/create"

export const CREATE_GROUP = "group/create"

export const JOIN_SESSION = "/session/join"


export const instance = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "cardmaster-user": "0189ad89-33e0-7e7f-b041-f396d82453d5"
  }
});

export default instance;
