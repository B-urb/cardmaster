import {Container, Icon, Label, Menu, Segment, Table} from "semantic-ui-react";
import {useQuery} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {getGames, getUsersForSession} from "./api/api";

const GameOverview = (props: { id: string }) => {

  const navigate = useNavigate()

  // Queries
  const {status, data, error} = useQuery<Game[], Error>({
    queryKey: ["Games", props.id],
    queryFn: () => getGames(props.id)
  })
  const userQuery = useQuery<User[]>({queryKey: ["Users", props.id], queryFn: () => getUsersForSession(props.id)})

  function calculatePointsForUser(playerId: string) {
    return data!.reduce((current, game) => {
      return current += game.points[playerId]
    }, 0)
  }

  function calculateFinesForUser(playerId: string) {
    return data!.reduce((current, game) => {
      return current += game.fines[playerId]
    }, 0)
  }

  return <Container>
    {status === 'pending' && <span>Loading...</span>}
    {status === 'error' && <span>Error: {error?.message}</span>}
    {status === 'success' && data && userQuery.data && Object.keys(data).length > 0 && (
        <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell></Table.HeaderCell>
                {userQuery.data.map((user, id) =>
                    <Table.HeaderCell key={id}>{user.username}</Table.HeaderCell>
                )}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row positive>
                <Table.Cell><b>Overview</b></Table.Cell>
                {userQuery.data.map((user) =>
                    <Table.Cell>
                      <Segment vertical>
                        <p><b>{`Points: ${calculatePointsForUser(user.id)}`}</b></p>
                        <p><b>{`Fines: ${calculateFinesForUser(user.id)}`}</b></p>
                      </Segment>
                    </Table.Cell>)}
              </Table.Row>
              {data.map((game, id) =>
                  <Table.Row key={id} onClick={() => navigate(`game/${game.id}`)}>
                    <Table.Cell>
                      <Label ribbon>{id}</Label>
                    </Table.Cell>
                    {userQuery.data.map((user, id) =>
                        <Table.Cell key={id}>
                          <Segment vertical>
                            <p>{`Points: ${game.points[user.id]}`}</p>
                            <p>{`Fines: ${game.fines[user.id]}`}</p>
                          </Segment>
                        </Table.Cell>)}
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

export default GameOverview