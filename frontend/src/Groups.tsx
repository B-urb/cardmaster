import instance, {CREATE_GROUP, GET_GROUPS} from "./constants.ts";
import {useQuery} from "react-query";
import {Button, Container, Form, Header, List} from "semantic-ui-react";
import {useState} from "react";
import {NavLink} from "react-router-dom";


async function getGroups(): Promise<Group[]> {
  return await instance.get<Group[]>(GET_GROUPS).then((response) => response.data)
}

async function submitUser(name: string) {
  return await instance.post(CREATE_GROUP, {"name": name})
}

const Groups = () => {
  const [name, setName] = useState("")

  const {status, data, error} = useQuery<Group[], Error>("Groups", getGroups)

  return <Container>
    <Header as='h2'>Meine Gruppen:</Header>
    {status === 'idle' && <div>idle</div>}
    {status === 'loading' && <span>Loading...</span>}
    {status === 'error' && <span>Error: {error?.message}</span>}
    {status === 'success' && data && Object.keys(data).length > 0 && (
        <List inverted animated>
          {data.map((group, id) => (
              <List.Item key={id}>
                <NavLink to={`/group/${group.id}`}>{group.name}</NavLink>
              </List.Item>
          ))}
        </List>
    )}
    {status === 'success' && !data && <div>No Groups yet</div>}
    <Header as={"h3"}>Neue Gruppe anlegen:</Header>
    <Form onSubmit={() => submitUser(name)}>
      <Form.Input label='Group Name' onChange={(e) => setName(e.target.value)} placeholder='Die frechen Lausbuben'
                  value={name}/>
      <Button>Create Group</Button>
    </Form>
  </Container>
}

export default Groups