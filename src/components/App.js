import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fBase";

function App() {
  const [init, setInit] = useState(false);
  const [isLogin, setLogin] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setLogin(true);
        setUserObj(user);
      } else {
        setLogin(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLogin={isLogin} userObj={userObj}></AppRouter>
      ) : (
        "loading..."
      )}
      <footer>dd's firebase</footer>
    </>
  );
}

export default App;
