import {Container, Header, List} from "semantic-ui-react";
import {useQuery} from "react-query";
import {useNavigate} from "react-router-dom";
import {getSessions} from "./api/api.tsx";

function toGermanDate(dateString: string) {
  const dateObj = new Date(dateString);

// Format the date using the German locale
  return dateObj.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

}
const SessionsOverview = (props: { id: string }) => {
  const navigate = useNavigate()
  const {status, data, error} = useQuery<GameSession[], Error>(["Sessions", props.id], () => getSessions(props.id))

  return <Container>{status === 'idle' && <div>idle</div>}
    {status === 'loading' && <span>Loading...</span>}
    {status === 'error' && <span>Error: {error?.message}</span>}
    {status === 'success' && data && Object.keys(data).length > 0 && (

        <Container>
          <Header as="h2">Spielsitzungen</Header>
          <List link>
            {data.map((session, id) => (
                <List.Item as="a" active={false} key={id} onClick={() => navigate(`session/${session.id}`)}>
                  {toGermanDate(session.startedAt)}
                </List.Item>
            ))}
          </List>
        </Container>)}
  </Container>

}


export default SessionsOverview