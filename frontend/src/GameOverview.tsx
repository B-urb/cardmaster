import {Container, Icon, Label, List, ListItem, Menu, Table} from "semantic-ui-react";
import {useQuery} from "react-query";
import {GET_GAMES, instance} from "./constants.ts";

async function getGames(sessionId: string): Promise<Game[]> {
  return instance.get(GET_GAMES(sessionId)).then((response) => response.data)
}

const GameOverview = (props: { id: string }) => {
  // Queries
  const {status, data, error} = useQuery<Game[], Error>(["Games", props.id], () => getGames(props.id))

  return <Container>
    {status === 'idle' && <div>idle</div>}
    {status === 'loading' && <span>Loading...</span>}
    {status === 'error' && <span>Error: {error?.message}</span>}
    {status === 'success' && data && Object.keys(data).length > 0 && (
        <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Header</Table.HeaderCell>
                <Table.HeaderCell>Header</Table.HeaderCell>
                <Table.HeaderCell>Players</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {data.map((game, id) =>
                  <Table.Row key={id}>
                    <Table.Cell>
                      <Label ribbon>{id}</Label>
                    </Table.Cell>
                    <Table.Cell><Label>

                    </Label></Table.Cell>
                    <Table.Cell><List>
                      {Object.keys(game.points).map((key, id) =>
                          <ListItem key={id}>{key}</ListItem>)}
                    </List></Table.Cell>
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