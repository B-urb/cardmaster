type map = {
  [key: string]: number
}

interface Game {
  id: string
  players: Array<User>
  points: object
  fines: object
}

interface GameSession {
  id: string
  players: Object
}

interface User {
  id: string
}

interface Group {
  id: string
  name: string
  players: Object

}

interface PlaysIn {
  id: string

}
