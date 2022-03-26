import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { AuthContextProvider } from "./context/AuthContext";
import { ContextProvider } from "./SocketContext";
import { UserContextProvider } from "./context/users/UserContext";
import { StateProvider } from "./context/messenger/StateProvider";
import reducer, { initialState } from "./context/messenger/reducer";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ContextProvider>
        <UserContextProvider>
          <StateProvider initialState={initialState} reducer={reducer}>
            <App />
          </StateProvider>
        </UserContextProvider>
      </ContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
