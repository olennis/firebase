import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fBase";

function App() {
  const [isLogin, setLogin] = useState(authService.currentUser);
  return (
    <>
      <AppRouter isLogin={isLogin}></AppRouter>
      <footer>dd's firebase</footer>
    </>
  );
}

export default App;
