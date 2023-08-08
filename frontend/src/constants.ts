import axios from "axios";

export const CREATE_GAME = "/game/create"
export const GET_GAMES = (id: string) => `game/${id}`

export const GET_GROUPS = "group"
export const GET_SESSIONS = (id: string) => `session/${id}`
export const CREATE_SESSION = "session/create"

export const CREATE_GROUP = "group/create"
export const GET_GROUP_FOR_PLAYER = (id: string) => `group/${id}`

export const JOIN_SESSION = "/session/join"


export const instance = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "cardmaster-user": "user:lhxwr5fi4p17z4ggtpy0"
  }
});

export default instance;
