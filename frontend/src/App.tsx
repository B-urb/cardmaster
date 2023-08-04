import './App.css'
import {Header, Segment} from "semantic-ui-react";
import SessionsOverview from "./SessionsOverview.tsx";

function App() {

  return (
      <>
        <Header as={"h1"}>Cardmaster</Header>
        <Segment>
          <SessionsOverview/>
        </Segment>
      </>
  )
}

export default App
