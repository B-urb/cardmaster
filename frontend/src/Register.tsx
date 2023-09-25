import {Button, Form, Message, Segment} from "semantic-ui-react";
import React, {useState} from "react";
import {useNavigate,} from "react-router-dom";
import {register} from "./api/api";
import {AxiosError} from "axios";


const Register = () => {
  const navigate = useNavigate()


  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.currentTarget;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation for password confirmation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      await register(
          {
            email: formData.email,
            username: formData.username,
            password: formData.password,
            confirmPassword: formData.confirmPassword
          })
      navigate("/login")
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
      <Form.Input type="email" label={"E-Mail"}
                  value={formData.email}
                  name={"email"}
                  onChange={handleChange}
                  required/>
      <Form.Input type="password" label={"Password"}
                  value={formData.password}
                  name={"password"}
                  onChange={handleChange}
                  required/>
      <Form.Input type="password" label={"Confirm Password"}
                  value={formData.confirmPassword}
                  name={"confirmPassword"}
                  onChange={handleChange}
                  required/>
      <Button>Register</Button>
    </Form>
    {error.length !== 0 ? <Message size='massive'>{error}</Message> : null}
  </Segment>
}


export default Register;