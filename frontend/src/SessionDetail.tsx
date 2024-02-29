import GameOverview from "./GameOverview";
import {Button, Container} from "semantic-ui-react";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {startGame} from "./api/api";

const SessionDetail = () => {
  const params = useParams()
  const navigate = useNavigate()
  const sessionId = params["sessionId"]
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: startGame,
    // Optional: onSuccess callback if you want to perform any actions after successful mutation
    onSuccess: (data) => {
      const game: Game = data.data
      console.log(game)
      // For example, you can invalidate and refetch something after a mutation
      queryClient.invalidateQueries({queryKey: ["Games"]});
      navigate(`game/${game.id}`)
    },
  })

  return sessionId && <Container>
    <GameOverview id={sessionId}/>
    <Button onClick={() => mutation.mutate(sessionId)}>Add Game</Button>
  </Container>
}


export default SessionDetail