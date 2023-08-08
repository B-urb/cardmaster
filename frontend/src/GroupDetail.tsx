import SessionsOverview from "./SessionsOverview.tsx";
import {useParams} from "react-router-dom";
import {Button, Container} from "semantic-ui-react";
import instance, {CREATE_SESSION} from "./constants.ts";

async function startSession(groupId: string) {
  return await instance.post(CREATE_SESSION, {id: groupId})
}

const GroupDetail = () => {
  const params = useParams()
  const groupId = params["groupId"]


  return <Container>
    <SessionsOverview id={groupId}/>
    <Button onClick={() => startSession(groupId)}>Start new Session</Button>
  </Container>
}


export default GroupDetail