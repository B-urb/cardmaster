import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Button, Header, Segment} from "semantic-ui-react";
import PointCounter from "./PointCounter.tsx";
import SessionsOverview from "./SessionsOverview.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
      <>
        <Header as={"h1"}>Cardmaster</Header>
        <Segment>
          <SessionsOverview/>
          <Button>Start new Session</Button>
        </Segment>
      </>
  )
}

export default App
