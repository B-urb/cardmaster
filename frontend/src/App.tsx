import './App.css'
import {Button, Header} from "semantic-ui-react";
import {Outlet, Route, Routes} from "react-router-dom";
import Groups from "./Groups";
import GroupDetail from "./GroupDetail";
import SessionDetail from "./SessionDetail";
import GameCreate from "./GameCreate";
import Login from "./Login";
import Register from "./Register";
import EntryPage from "./EntryPage";
import NotFound from "./NotFound.tsx";
import instance from "./constants.ts";

function App() {

  return (
      <>
        <Header as={"h1"}>Cardmaster</Header>
        <Button onClick={() => instance.get("/logout")}>Logout</Button>
        <Routes>
          <Route path={"/"} element={<EntryPage/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="group" element={<Groups/>}/>
          <Route path="group/:groupId" element={<GroupDetail/>}/>
          <Route path="group/:groupId/session/:sessionId" element={<SessionDetail/>}/>
          <Route path="group/:groupId/session/:sessionId/game/:gameId" element={<GameCreate/>}/>
          <Route path="*" element={<NotFound/>}/>

        </Routes>
        <Outlet/>
      </>
  )
}

export default App
