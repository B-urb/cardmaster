import GameOverview from "./GameOverview.tsx";
import {Button, Container} from "semantic-ui-react";
import instance, {CREATE_GAME} from "./constants.ts";
import {useParams} from "react-router-dom";

async function startGame(id: string) {
  return await instance.post(CREATE_GAME, {id: id})
}

const SessionDetail = () => {
  const params = useParams()
  const sessionId = params["sessionId"]


  return <Container>
    <GameOverview id={sessionId}/>
    <Button onClick={() => startGame(sessionId)}>Start new Game</Button>
  </Container>
}


export default SessionDetail