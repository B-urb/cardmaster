import {
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxProps,
  Container,
  Divider, Grid,
  Header,
  Label,
  Radio,
  Segment
} from "semantic-ui-react"
import React, {FormEvent, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getGame, getUsersForSession, updateGame} from "./api/api";
import {Winner} from "./types/Types";

function createEmptyFromPlayers(players: Array<string>) {
  return players.reduce((accumulator, user) => {
    accumulator[user] = 0;
    return accumulator;
  }, {} as Record<string, number>);
}

type PointGroupProps = {
  playerId: string;
  points: number;
  update: (playerId: string, value: number) => void;
};
const PointGroup: React.FC<PointGroupProps> = ({playerId, points, update}) => (
    <ButtonGroup>
      <Button onClick={() => update(playerId, -1)} icon={'minus'}/>
      <Label size={"huge"}>{points}</Label>
      <Button onClick={() => update(playerId, 1)} icon={'plus'}/>
    </ButtonGroup>
);

const GameCreate = () => {
  const params = useParams()
  const navigate = useNavigate()
  const gameId = params["gameId"]
  const sessionId = params["sessionId"]
  const queryClient = useQueryClient()
  if (sessionId === undefined) return <div>No SessionId</div>
  if (gameId === undefined) return <div>No GameId</div>
  const {data} = useQuery<Game, Error>([gameId, gameId], () => getGame(gameId))
  const userQuery = useQuery<User[]>(["Users", sessionId], () => getUsersForSession(sessionId))

  const initPlayers: Array<string> = []
  const initGame: Game = {
    id: "",
    sessionId: sessionId,
    winningTeam: null,
    winners: [],
    players: initPlayers,
    points: createEmptyFromPlayers(initPlayers),
    fines: createEmptyFromPlayers(initPlayers)
  }
  const [game, setGame] = useState(initGame); // Initialize game as null
  useEffect(() => {
    if (data) {
      const fines = data.fines
      const points = data.points
      setGame({
        id: gameId,
        sessionId: data.sessionId,
        winningTeam: data.winningTeam,
        winners: data.winners,
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

  const findPlayer = (findUser: string): User | undefined => {
    if (userQuery.data)
      return userQuery.data.find((user) => user.id == findUser)
    else return undefined
  }

  const updatePoints = (delta: number) => {

    const newPoints = game.players.reduce((p, player) => {
      return (game.winners.includes(player)) ? {...p, [player]: (game.points[player] + delta)} : {
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
  const handleChange = (_: FormEvent<HTMLInputElement>, {value}: CheckboxProps) => {
    setGame(game =>
        ({
          ...game,
          winningTeam: value
        }))
  }

  const handleCheckboxChange = (player: string) => {
    if (game.winners.includes(player)) {
      // If the checkbox is already checked, uncheck it
      setGame(game =>
          ({
            ...game,
            winners: game.winners.filter((elem) => elem !== player),
            points: {
              ...game.points,
              [player]: -game.points[player]
            }
          }))
    } else {
      if (game.winners.length > 0) {
        // If less than two checkboxes are checked, check this one
        setGame(game =>
            ({
              ...game,
              winners: [...game.winners, player],
              points: {
                ...game.points,
                [player]: game.points[game.winners[0]] // All points for the winners should be the same, if a new one gets added
              }
            }))
      } else {
        // If two checkboxes are already checked, uncheck the first one and check this one
        setGame(game =>
            ({
              ...game,
              winners: [...game.winners, player]
            }))
      }
    }
  };

  return <Segment>
    <Header as={"h2"}>Strafen</Header>
    {game.players.map((player: string, id) =>
        <Container key={id}>
          <Grid centered celled={"internally"} columns={2}>
            <Grid.Row>
              <Grid.Column width={2}>
          <Label size={"huge"}>{findPlayer(player)!.username}</Label>
              </Grid.Column>
              <Grid.Column width={3}>
          <PointGroup playerId={player} points={game.fines[player]} update={updateFines}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
    )}
    <Divider/>
    <Header as={"h2"}>Gewinner</Header>
    <Grid columns={2}>
      <Grid.Column>
    <Radio
        fitted
        toggle
        label='Re'
        name='radioGroup'
        value={Winner.RE}
        checked={(game.winningTeam === Winner.RE)}
        onChange={handleChange}
    /></Grid.Column>
    <Grid.Column><Radio
        fitted
        toggle
        label='Contra'
        name='radioGroup'
        value={Winner.CONTRA}
        checked={game.winningTeam === Winner.CONTRA}
        onChange={handleChange}
    />
    </Grid.Column>
    </Grid>
    <Header as={"h2"}>Winning Players:</Header>
    <Grid centered>
    {game.players.map((player, id) => <Checkbox
        key={id}
        label={findPlayer(player)!.username}
        checked={game.winners.includes(player)}
        onChange={() => handleCheckboxChange(player)}
    />)}
    </Grid>
    {game.winners.length !== 0 ? <Container>
      <Header as={"h2"}>Punkte</Header>
      <ButtonGroup>
      <Button onClick={() => updatePoints(-1)} icon={'minus'}/>
      <Label size={"huge"}>{game.points[game.winners[0]]}</Label>
      <Button onClick={() => updatePoints(1)} icon={'plus'}/>
      </ButtonGroup>
    </Container> : <div/>
    }
    <Divider/>


    <Button onClick={handleUpdate}>Save</Button>
  </Segment>

}


export default GameCreate