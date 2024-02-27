import React from 'react'
import ReactDOM from 'react-dom/client'
import 'semantic-ui-css/semantic.min.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {HashRouter} from "react-router-dom";
import App from "./App.tsx";


const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <HashRouter><App/></HashRouter>
      </QueryClientProvider>
    </React.StrictMode>,
)
