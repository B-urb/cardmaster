import {Button, Form, Message, Segment} from "semantic-ui-react";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {checkLogin, login} from "./api/api";
import {AxiosError, HttpStatusCode} from "axios";


const Login = () => {
  const navigate = useNavigate()

  useEffect(() => {
    checkLogin().then(code => code === HttpStatusCode.Ok ? navigate("/group") : void (0))
  }, []);

  const [error, setError] = useState("")

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
      navigate("/group")
    } catch (error: any) {
      const e = error as AxiosError
      e.response === undefined ? setError(e.message) : setError(e.response.data as string);
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
    {error.length !== 0 ? <Message size='massive'>{error}</Message> : null}
  </Segment>

}


export default Login;