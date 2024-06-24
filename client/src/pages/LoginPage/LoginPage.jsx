
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";
import Header from "../../components/Header/Header";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    authService
      .login({ email, password })
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };
  return (

    <>
    <Header/>
      <div className="pt-10 flex flex-col items-center justify-center gap-10 h-full">
      <h1 className="text-3xl">Login</h1>
      <form
        onSubmit={handleLoginSubmit}
        className="flex flex-col justify-center items-center gap-5 _login">
        <input
          className="w-96 h-10 pl-2 rounded-lg border border-solid border-slate-800  bg-transparent"
          type="email"
          name="email"
          placeholder="Email :"
          value={email}
          onChange={(event) => setEmail(event.target.value)} />
        <input
          className="w-96 h-10 pl-2 rounded-lg border border-solid border-slate-800 bg-transparent"
          placeholder="Password :"
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          className="w-96 h-10 pl-2 rounded-lg border border-solid border-slate-800 bg-transparent font-bold"
          type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
    </>
  );
}

export default LoginPage;
