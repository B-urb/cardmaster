import './App.css'
import {Header} from "semantic-ui-react";
import {Outlet, Route, Routes} from "react-router-dom";
import Groups from "./Groups.tsx";
import GroupDetail from "./GroupDetail.tsx";
import SessionDetail from "./SessionDetail.tsx";
import GameCreate from "./GameCreate.tsx";
import Login from "./Login.tsx";
import Register from "./Register.tsx";
import EntryPage from "./EntryPage.tsx";

function App() {

  return (
      <>
        <Header as={"h1"}>Cardmaster</Header>
        <Routes>
          <Route path={"/"} element={<EntryPage/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="group" element={<Groups/>}/>
          <Route path="group/:groupId" element={<GroupDetail/>}/>
          <Route path="group/:groupId/session/:sessionId" element={<SessionDetail/>}/>
          <Route path="group/:groupId/session/:sessionId/game/:gameId" element={<GameCreate/>}/>

        </Routes>
        <Outlet/>
      </>
  )
}

export default App
