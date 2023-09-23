import instance, {
  CREATE_GAME,
  CREATE_GROUP,
  GET_GAME,
  GET_GAMES,
  GET_GROUPS,
  GET_SESSION,
  GET_SESSION_USERS,
  GET_SESSIONS,
  LOGIN,
  REGISTER,
  UPDATE_GAME
} from "../constants";
import {AxiosResponse} from "axios";


export async function getSessions(id: string): Promise<GameSession[]> {
  return await instance.get<GameSession[]>(GET_SESSIONS(id)).then((response: AxiosResponse<GameSession[]>) => response.data)
}

export async function updateGame(game: Game) {
  return await instance.post(UPDATE_GAME,
      {
        id: game.id, points: game.points, fines: game.fines,
        winners: game.winners, winningTeam: game.winningTeam
      })
}

export async function getSession(id: string): Promise<GameSession> {
  try {
    const response = await instance.get<GameSession>(GET_SESSION(id))
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || 'Network error');
  }
}

export async function checkLogin() {
  const response = await instance.get("loginc")
  return response.status
}

export async function getGame(id: string): Promise<Game> {
  try {
    const response = await instance.get<Game>(GET_GAME(id))
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || 'Network error');
  }
}

export async function getUsersForSession(sessionId: string): Promise<User[]> {
  return instance.get(GET_SESSION_USERS(sessionId)).then((response: AxiosResponse<User[]>) => response.data)
}

export async function getGames(sessionId: string): Promise<Game[]> {
  return instance.get(GET_GAMES(sessionId)).then((response: AxiosResponse<Game[]>) => response.data)
}


export async function getGroups(): Promise<Group[]> {
  return await instance.get<Group[]>(GET_GROUPS).then((response: AxiosResponse<Group[]>) => response.data)
}

export async function createGroup(name: string) {
  return await instance.post(CREATE_GROUP, {"name": name})
}

export async function login(data: LoginData) {
  return await instance.post(LOGIN, data)
}

export async function register(formdata: RegisterData) {
  return await instance.post(REGISTER, formdata)
}

export async function startGame(id: string) {
  return await instance.post(CREATE_GAME, {id: id})
}