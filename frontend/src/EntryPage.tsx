import {Button, Container} from "semantic-ui-react";
import {useNavigate} from "react-router-dom";
import {useQuery} from "react-query";
import {AxiosError} from "axios";
import {checkLogin} from "./api/api.ts";


const EntryPage = () => {
  const navigate = useNavigate()
  const {data} = useQuery<LoggedIn, AxiosError>("LoggedIn", checkLogin)
 console.log(data)

  return <Container>
    {data !== undefined && data.isLoggedIn ?
        <Button onClick={() => navigate("/group")}>To Group Overview</Button> : <>
          <Button onClick={() => navigate("/login")}>Login</Button>
          <Button onClick={() => navigate("/register")}>Register</Button></>}
  </Container>
}


export default EntryPage