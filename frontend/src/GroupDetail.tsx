import SessionsOverview from "./SessionsOverview.tsx";
import {useParams} from "react-router-dom";
import {Button, Divider, Form, Grid, Header, List, ListItem, Segment} from "semantic-ui-react";
import instance, {CREATE_SESSION, GET_GROUP_USERS, JOIN_USER_TO_GROUP} from "./constants.ts";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {useState} from "react";

async function startSession(groupId: string) {
  return await instance.post(CREATE_SESSION, {id: groupId})
}

async function addUserToGroup(args: { username: string, groupId: string }) {
  return await instance.post(JOIN_USER_TO_GROUP, {username: args.username, groupId: args.groupId})

}

async function getUsersForGroup(groupId: string): Promise<User[]> {
  return instance.get(GET_GROUP_USERS(groupId)).then((response) => response.data)
}

const GroupDetail = () => {
  const params = useParams()
  const groupId = params["groupId"]
  const [player, setPlayer] = useState("")
  const queryClient = useQueryClient()

  const userQuery = useQuery<User[]>(["GroupUsers", groupId], () => getUsersForGroup(groupId))

  const mutation = useMutation(startSession, {
    // Optional: onSuccess callback if you want to perform any actions after successful mutation
    onSuccess: () => {
      // For example, you can invalidate and refetch something after a mutation
      queryClient.invalidateQueries("Sessions");
    },
  })

  const addPlayerMutation = useMutation(addUserToGroup, {
    // Optional: onSuccess callback if you want to perform any actions after successful mutation
    onSuccess: () => {
      queryClient.invalidateQueries("GroupUsers")
      // For example, you can invalidate and refetch something after a mutation
    },
  })

  return <Grid stackable columns={2}>
    <Grid.Row>
      <Grid.Column>
        <Segment>
    <SessionsOverview id={groupId}/>
          <Divider/>
          <Button onClick={() => mutation.mutate(groupId)}>Start new Session</Button>
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment>
          <Header as="h3">Players in this group:</Header>
          {userQuery.data && <List inverted celled>{userQuery.data.map((user, key) =>
              <ListItem key={key}>{user.username}</ListItem>)}
          </List>}
          <Form onSubmit={() => addPlayerMutation.mutate({username: player, groupId})}>
            <Form.Input label={"Add player:"} name={"player"} value={player}
                        onChange={(e) => setPlayer(e.target.value)}/>
            <Form.Button>Add player</Form.Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>
}


export default GroupDetail