import {Container, Header, Icon, Label, Menu, Table} from "semantic-ui-react";
import {useQuery} from "react-query";
import {useNavigate} from "react-router-dom";
import {getGames, getUsersForSession} from "./api/api";

const GameOverview = (props: { id: string }) => {

  const navigate = useNavigate()

  // Queries
  const {status, data, error} = useQuery<Game[], Error>(["Games", props.id], () => getGames(props.id))
  const userQuery = useQuery<User[]>(["Users", props.id], () => getUsersForSession(props.id))

  return <Container>
    {status === 'idle' && <div>idle</div>}
    {status === 'loading' && <span>Loading...</span>}
    {status === 'error' && <span>Error: {error?.message}</span>}
    {status === 'success' && data && userQuery.data && Object.keys(data).length > 0 && (
        <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Header</Table.HeaderCell>
                <Table.HeaderCell>Players/Points</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {data.map((game, id) =>
                  <Table.Row key={id} onClick={() => navigate(`game/${game.id}`)}>
                    <Table.Cell>
                      <Label ribbon>{id}</Label>
                    </Table.Cell>
                    <Table.Cell>
                      {<PlayerPointsTable points={game.points} users={userQuery.data.reduce((obj, user) => {
                        return {...obj, [user.id]: user}
                      }, {})}/>
                      }
                    </Table.Cell>
                  </Table.Row>
              )
              }
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan='3'>
                  <Menu floated='right' pagination>
                    <Menu.Item as='a' icon>
                      <Icon name='chevron left'/>
                    </Menu.Item>
                    <Menu.Item as='a'>1</Menu.Item>
                    <Menu.Item as='a'>2</Menu.Item>
                    <Menu.Item as='a'>3</Menu.Item>
                    <Menu.Item as='a'>4</Menu.Item>
                    <Menu.Item as='a' icon>
                      <Icon name='chevron right'/>
                    </Menu.Item>
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
        </Table>)
  }
  </Container>
}

const PlayerPointsTable = (props: { points: Record<string, number>, users: Record<string, User> }) => {
  console.log(props.points)
  console.log(props.users)
  return <Table basic='very' celled collapsing>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Spieler</Table.HeaderCell>
        <Table.HeaderCell>Punkte</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {Object.keys(props.points).map((k, v) =>
          <Table.Row key={v}>
            <Table.Cell>
              <Header as='h4' image>
                <Header.Content>
                  {props.users[k] ? props.users[k].username : "User not found"}
                  <Header.Subheader>Human Resources</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>
              {props.points[k]}
            </Table.Cell>
          </Table.Row>
      )}
    </Table.Body>
  </Table>
}

export default GameOverview