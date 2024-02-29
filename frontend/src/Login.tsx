import {Button, Form, Message, Segment} from "semantic-ui-react";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {checkLogin, login} from "./api/api";
import {AxiosError} from "axios";
import {useQuery, useQueryClient} from "@tanstack/react-query";


const Login = () => {
  const {data, isLoading} = useQuery<LoggedIn, Error>({queryKey: ["LoggedIn"], queryFn: checkLogin})
  const queryClient = useQueryClient()
  const navigate = useNavigate()


  useEffect(() => {
    if (!isLoading) {
      console.log(data)
      if (data !== undefined && data.isLoggedIn) {
        navigate("/group")
      }
    }
  }, [data, isLoading]);


  const [errorMessage, setErrorMessage] = useState("")

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(
          {
            username: formData.username,
            password: formData.password,
          })
      queryClient.invalidateQueries({queryKey: ["LoggedIn"]}).then(
          () => navigate("/group")
      )
    } catch (error: any) {
      const e = error as AxiosError
      e.response === undefined ? setErrorMessage(e.message) : setErrorMessage(e.response.data as string);
    }
  };
  return <Segment>
    <Form onSubmit={handleSubmit}>
      <Form.Input type="username" label={"Username"}
                  value={formData.username}
                  name={"username"}
                  onChange={handleChange}
                  required/>
      <Form.Input type="password" label={"Password"}
                  value={formData.password}
                  name={"password"}
                  onChange={handleChange}
                  required/>
      <Button>Login</Button>
    </Form>
    {errorMessage.length !== 0 ? <Message size='massive'>{errorMessage}</Message> : null}
  </Segment>

}


export default Login;