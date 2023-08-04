import {Button, Container, Form} from "semantic-ui-react";
import GameOverview from "./GameOverview.tsx";
import {CREATE_GROUP, instance} from "./constants.ts";
import {useState} from "react";

async function submitUser(name: string) {
  return await instance.post(CREATE_GROUP, {"name": name})
}

const SessionsOverview = () => {
  const [name, setName] = useState("")
  return <Container>
    <GameOverview/>
    <Form onSubmit={() => submitUser(name)}>
      <Form.Input label='Group Name' onChange={(e) => setName(e.target.value)} placeholder='Die frechen Lausbuben'
                  value={name}/>
      <Button>Create Group</Button>
    </Form>
  </Container>
}


export default SessionsOverview