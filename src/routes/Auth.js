import { authService, firebaseInstance } from "fBase";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (err) {
      setError(err);
    }
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const toggleAccount = () => setNewAccount((pre) => !pre);

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };
  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input
            name="email"
            type="email"
            placeholder="email"
            required
            value={email}
            onChange={onChange}></input>
          <input
            name="password"
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={onChange}></input>
          <input
            type="submit"
            value={newAccount ? "create Account" : "sign in"}></input>
        </form>
        <span onClick={toggleAccount}>
          {newAccount ? "Sign in" : "create account"}
        </span>
      </div>
      <div>
        <button onClick={onSocialClick} name="google">
          google
        </button>
        <button onClick={onSocialClick} name="github">
          github
        </button>
      </div>
    </>
  );
};

export default Auth;
