import {Container, List} from "semantic-ui-react";
import {useQuery} from "react-query";
import instance, {GET_SESSIONS} from "./constants.ts";
import {NavLink} from "react-router-dom";

async function getSessions(id: string): Promise<Group[]> {
  return await instance.get<GameSession[]>(GET_SESSIONS(id)).then((response) => response.data)
}

const SessionsOverview = (props: { id: string }) => {

  const {status, data, error} = useQuery<GameSession[], Error>(["Sessions", props.id], () => getSessions(props.id))

  return <Container>{status === 'idle' && <div>idle</div>}
    {status === 'loading' && <span>Loading...</span>}
    {status === 'error' && <span>Error: {error?.message}</span>}
    {status === 'success' && data && Object.keys(data).length > 0 && (
        <Container>
          <List>
            {data.map((session, id) => (
                <List.Item key={id}>
                  <NavLink relative to={`session/${session.id}`}>{session.id}</NavLink>
                </List.Item>
            ))}
          </List>
        </Container>)}
  </Container>

}


export default SessionsOverview