import {Button, Form, Segment} from "semantic-ui-react";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {checkLogin, login} from "./api/api.tsx";
import {HttpStatusCode} from "axios";


const Login = () => {
  const navigate = useNavigate()

  useEffect(() => {
    checkLogin().then(code => code === HttpStatusCode.Ok ? navigate("/group") : void (0))
  }, []);


  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {data} = await login(
          {
            username: formData.username,
            password: formData.password,
          })
      navigate("/group")
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
      <Form.Input type="password" label={"Password"}
                  value={formData.password}
                  name={"password"}
                  onChange={handleChange}
                  required/>
      <Button>Login</Button>
    </Form>
  </Segment>

}


export default Login;