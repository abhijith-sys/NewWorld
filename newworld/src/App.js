import React from "react";
import { auth } from "./config";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import SignInButton from "./features/signinButton/SignInButton";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TerminalComponent from "./features/terminal/terminal";
import WelcomeLoader from "./features/welcomeLodaer/welcomeLoader";

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      {/* {!user ? <SignInButton /> : <TerminalComponent />} */}
      <TerminalComponent />
      {/* <WelcomeLoader/> */}

      {/* <Router>
        <Routes>
          <Route path="/" element={<SignInButton />} />
          <Route path="/terminal" element={<TerminalComponent/>} />
        </Routes>
      </Router> */}
    </div>
  );
}

export default App;
