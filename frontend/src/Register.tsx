import {Button, Form, Segment} from "semantic-ui-react";
import React, {useState} from "react";
import {useNavigate,} from "react-router-dom";
import {register} from "./api/api.tsx";


const Register = () => {
  const navigate = useNavigate()

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
  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
    } catch (error) {
      console.error('There was an error:', error);
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
  </Segment>
}


export default Register;