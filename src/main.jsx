import React from "react"
import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import { StoreProvider } from "./Store.jsx"
import { QueryClient, QueryClientProvider } from "react-query"

import App from "./App.jsx"
import "./index.css"

import QuizPage from "./pages/QuizPage.jsx"
import StartPage from "./pages/StartPage.jsx"
import ResultsPage from "./pages/ResultsPage.jsx"
import MissingPage from "./pages/MissingPage.jsx"

const queryClient = new QueryClient()

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<StartPage />} />
      <Route path="quiz" element={<QuizPage />} />
      <Route path="results" element={<ResultsPage />} />
      <Route path="*" element={<MissingPage />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <RouterProvider router={router} />
      </StoreProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
