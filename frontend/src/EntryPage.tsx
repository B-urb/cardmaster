import {Button, Container} from "semantic-ui-react";
import {useNavigate} from "react-router-dom";


const EntryPage = () => {
  const navigate = useNavigate()

  return <Container>
    <Button onClick={() => navigate("/login")}>Login</Button>
    <Button onClick={() => navigate("/register")}>Register</Button>
  </Container>
}


export default EntryPage