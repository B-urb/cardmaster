import './App.css'
import {Button, Header} from "semantic-ui-react";
import {Outlet, Route, Routes, useNavigate} from "react-router-dom";
import Groups from "./Groups";
import GroupDetail from "./GroupDetail";
import SessionDetail from "./SessionDetail";
import GameCreate from "./GameCreate";
import Login from "./Login";
import Register from "./Register";
import EntryPage from "./EntryPage";
import NotFound from "./NotFound.tsx";
import {checkLogin, handleLogout} from "./api/api.ts";
import {AxiosError} from "axios";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

function App() {
  const {data,} = useQuery<LoggedIn, AxiosError>({queryKey: ["LoggedIn"], queryFn: checkLogin})
  const queryClient = useQueryClient()
  const navigate = useNavigate()


  const mutation = useMutation({
    mutationFn: handleLogout,
    // Optional: onSuccess callback if you want to perform any actions after successful mutation
    onSuccess: () => {
      // For example, you can invalidate and refetch something after a mutation
      queryClient.invalidateQueries({queryKey: ["LoggedIn"]}).then((_) =>
          navigate("/")
      )
    },
  })
  return (
      <>
        <Header as={"h1"}>Cardmaster</Header>
        {data !== undefined && data.isLoggedIn ? <Button onClick={() => mutation.mutate()}>Logout</Button> : null}
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
