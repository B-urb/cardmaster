import {Button, ButtonGroup, Header, Label, List, Segment} from "semantic-ui-react"

const PointGroup = () => <ButtonGroup>
  <Button icon={'minus'}/>
  <Label>0</Label>
  <Button icon={'plus'}/>
</ButtonGroup>

const GameDetail = (props: { players: Array<User> }) => {

  return <Segment>
    <Header as={"h2"}>Strafen</Header>

    <List></List>
  </Segment>
}

export default GameDetail