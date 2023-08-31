import {useMutation, useQuery, useQueryClient} from "react-query";
import {Button, Form, Header, List, Segment} from "semantic-ui-react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {createGroup, getGroups} from "./api/api.tsx";


const Groups = () => {
  const [name, setName] = useState("")
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const {status, data, error} = useQuery<Group[], Error>("Groups", getGroups)
  const mutation = useMutation(createGroup, {
    // Optional: onSuccess callback if you want to perform any actions after successful mutation
    onSuccess: () => {
      // For example, you can invalidate and refetch something after a mutation
      queryClient.invalidateQueries("Groups");
      setName("")
    },
  })
  return <Segment>
    <Header as='h2'>Meine Gruppen:</Header>
    {status === 'idle' && <div>idle</div>}
    {status === 'loading' && <span>Loading...</span>}
    {status === 'error' && <span>Error: {error?.message}</span>}
    {status === 'success' && data && Object.keys(data).length > 0 && (
        <List link animated>
          {data.map((group, id) => (
              <List.Item as="a" onClick={() => navigate(`/group/${group.id}`)} key={id}>
                {group.name}
              </List.Item>
          ))}
        </List>
    )}
    {status === 'success' && !data && <div>No Groups yet</div>}
    <Header as={"h3"}>Neue Gruppe anlegen:</Header>
    <Form onSubmit={() => mutation.mutate(name)}>
      <Form.Input label='Group Name' onChange={(e) => setName(e.target.value)} placeholder='Die frechen Lausbuben'
                  value={name}/>
      <Button>Create Group</Button>
    </Form>
  </Segment>
}

export default Groups