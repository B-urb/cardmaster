import axios from "axios";

export const CREATE_GAME = "/game/create"
export const UPDATE_GAME = "/game/update"

export const GET_GAMES = (id: string) => `game/${id}`

export const GET_GROUPS = "group"
export const GET_SESSIONS = (id: string) => `session/${id}`

export const GET_SESSION = (id: string) => `session/1/${id}`
export const GET_SESSION_USERS = (id: string) => `session/user/${id}`

export const GET_GROUP_USERS = (id: string) => `group/user/${id}`

export const GET_GAME = (id: string) => `game/1/${id}`


export const CREATE_SESSION = "session/create"


export const REGISTER = "register"
export const LOGIN = "login"

export const CREATE_GROUP = "group/create"
export const JOIN_USER_TO_GROUP = "group/join"

export const GET_GROUP_FOR_PLAYER = (id: string) => `group/${id}`

export const JOIN_SESSION = "/session/join"


export const instance = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
  withCredentials: true
});

export default instance;
