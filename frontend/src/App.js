import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { HomeView } from "./views/HomeView";
import Context from "./Context/UserContext";
import RequireAuth from "./components/RequireAuth";
import RequireRole from "./components/RequireRole";
import { DetailsView } from "./views/DetailsView";
import AuthView from "./views/AuthView";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Context>
          <Routes>
            <Route element={<RequireAuth />}>
              <Route path="/details/:id" element={<DetailsView />} />
              <Route exact path="/" element={<HomeView />} />
            </Route>
            <Route element={<RequireRole role={"ADMIN"} />}></Route>
            <Route path="/auth" element={<AuthView />} />
          </Routes>
        </Context>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
