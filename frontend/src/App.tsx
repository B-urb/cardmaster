import './App.css'
import {Header} from "semantic-ui-react";
import {NavLink, Outlet, Route, Routes} from "react-router-dom";
import Groups from "./Groups.tsx";
import GroupDetail from "./GroupDetail.tsx";
import SessionDetail from "./SessionDetail.tsx";
import GameDetail from "./GameDetail.tsx";

function App() {

  return (
      <>
        <Header as={"h1"}>Cardmaster</Header>
        <Routes>
          <Route path={"/"} element={<NavLink to="/groups">Groups</NavLink>}/>
          <Route path="group" element={<Groups/>}/>
          <Route path="group/:groupId" element={<GroupDetail/>}/>
          <Route path="group/:groupId/session/:sessionId" element={<SessionDetail/>}/>
          <Route path="group/:groupId/session/:sessionId/game/:gameId" element={<GameDetail/>}/>
        </Routes>
        <Outlet/>
      </>
  )
}

export default App
