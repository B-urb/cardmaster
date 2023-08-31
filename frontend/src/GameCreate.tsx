import {Button, ButtonGroup, Checkbox, Container, Divider, Header, Label, Radio, Segment} from "semantic-ui-react"
import React, {FormEvent, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getGame, getUsersForSession, updateGame} from "./api/api.tsx";
import {Winner} from "./types/Types.ts";

function createEmptyFromPlayers(players: Array<string>) {
  return players.reduce((accumulator, user) => {
    accumulator[user] = 0;
    return accumulator;
  }, {} as Record<string, number>);
}

const PointGroup = ({playerId, points, update}) => <ButtonGroup>

  <Button onClick={() => update(playerId, -1)} icon={'minus'}/>
  <Label>{points}</Label>
  <Button onClick={() => update(playerId, 1)} icon={'plus'}/>
</ButtonGroup>

const GameCreate = () => {
  const params = useParams()
  const navigate = useNavigate()
  const gameId = params["gameId"]
  const sessionId = params["sessionId"]
  const queryClient = useQueryClient()
  if (sessionId === undefined) return <div>No SessionId</div>
  if (gameId === undefined) return <div>No GameId</div>
  const {status, data} = useQuery<Game, Error>([gameId, gameId], () => getGame(gameId))
  const userQuery = useQuery<User[]>(["Users", sessionId], () => getUsersForSession(sessionId))

  const initPlayers: Array<string> = []
  const initGame: Game = {
    id: "",
    sessionId: sessionId,
    winnerTeam: null,
    winners: [],
    players: initPlayers,
    points: createEmptyFromPlayers(initPlayers),
    fines: createEmptyFromPlayers(initPlayers)
  }
  const [game, setGame] = useState(initGame); // Initialize game as null
  const [checkedBoxes, setCheckedBoxes] = useState([]);
  useEffect(() => {
    if (data) {
      const fines = data.fines
      const points = data.points
      setGame({
        id: gameId,
        sessionId: data.sessionId,
        winnerTeam: null,
        winners: [],
        players: data.players,
        points: points,
        fines: fines,
      });
    }
  }, [data]);

  const mutation = useMutation(updateGame, {
    // Optional: onSuccess callback if you want to perform any actions after successful mutation
    onSuccess: () => {
      queryClient.invalidateQueries(gameId)
      queryClient.invalidateQueries("Games")
      navigate(-1)
      // For example, you can invalidate and refetch something after a mutation
    },
  })

  const findPlayer = (findUser: string): User => {
    if (userQuery.data)
      return userQuery.data.find((user) => user.id == findUser)
    else return {username: "User not found"}
  }

  const updatePoints = (delta: number) => {

    const newPoints = game.players.reduce((p, player) => {
      return (player in game.winnerTeam) ? {...p, [player]: (game.points[player] + delta)} : {
        ...p,
        [player]: (game.points[player] - delta)
      }
    }, {})
    setGame(prevGame => ({
      ...prevGame,
      points: newPoints
    }));
  }

  const updateFines = (playerId: string, delta: number) => {
    setGame(prevGame => ({
      ...prevGame,
      fines: {
        ...prevGame.fines,
        [playerId]: (prevGame.fines[playerId] || 0) + delta
      }
    }));
  };
  const handleUpdate = () => {
    mutation.mutate(game)

  }
  const handleChange = (e: FormEvent<HTMLInputElement>, {value}) => {
    console.log(value)
    setGame(game =>
        ({
          ...game,
          winnerTeam: value
        }))
  }

  const handleCheckboxChange = (id) => {
    if (checkedBoxes.includes(id)) {
      // If the checkbox is already checked, uncheck it
      setCheckedBoxes(checkedBoxes.filter(checkboxId => checkboxId !== id));
    } else {
      if (checkedBoxes.length < 2) {
        // If less than two checkboxes are checked, check this one
        setCheckedBoxes([...checkedBoxes, id]);
      } else {
        // If two checkboxes are already checked, uncheck the first one and check this one
        setCheckedBoxes([checkedBoxes[1], id]);
      }
    }
  };

  return <Segment>
    <Header as={"h2"}>Strafen</Header>
    {game.players.map((player: string, id) =>
        <Container key={id}>
          <Label>{findPlayer(player).username}</Label>
          <PointGroup playerId={player} points={game.fines[player]} update={updateFines}/>
        </Container>
    )}
    <Divider/>
    <Header as={"h2"}>Gewinner</Header>
    <Radio
        label='Re'
        name='radioGroup'
        value={Winner.RE}
        checked={(game.winnerTeam === Winner.RE)}
        onChange={handleChange}
    />
    <Radio
        label='Contra'
        name='radioGroup'
        value={Winner.CONTRA}
        checked={game.winnerTeam === Winner.CONTRA}
        onChange={handleChange}
    />
    <Header as={"h2"}>Winning Players:</Header>
    {game.players.map((player, id) => <Checkbox
        key={id}
        label={findPlayer(player).username}
        checked={checkedBoxes.includes(id)}
        onChange={() => handleCheckboxChange(id)}
    />)}

    {checkedBoxes.length !== 0 ? <Container>
      <Header as={"h2"}>Punkte</Header>
      <Button onClick={() => updatePoints(-1)} icon={'minus'}/>
      <Label>{game.points[game.winners[0]]}</Label>
      <Button onClick={() => updatePoints(1)} icon={'plus'}/>
    </Container> : <div/>
    }


    <Button onClick={handleUpdate}>Save</Button>
  </Segment>

}


export default GameCreate