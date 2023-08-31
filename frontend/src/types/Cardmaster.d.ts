
type map = {
  [key: string]: number
}

interface Game {
  id: string
  sessionId: string
  players: Array<string>
  winnerTeam: Winner | null
  winners: Array<string>
  points: Record<string, number>;
  fines: Record<string, number>;
}

interface GameSession {
  id: string
  players: Array<string>
  startedAt: string
}

interface LoginData {
  username: string
  password: string
}

interface RegisterData {
  email: string
  password: string
  confirmPassword: string
  username: string
}

interface User {
  id: string;
  username: string;
  email: string;
}

interface Group {
  id: string
  name: string
  players: Array<User>
}

interface PlaysIn {
  id: string

}
