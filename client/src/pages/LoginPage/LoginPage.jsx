
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";

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
    <div className="p-5 flex flex-col items-center gap-10">
      <h1 className="text-5xl">Login</h1>
      <form
        onSubmit={handleLoginSubmit}
        className="flex flex-col justify-center items-center gap-5 _login">
        <input
          className="w-96 h-10 pl-2 rounded-lg border border-solid  bg-transparent"
          type="email"
          name="email"
          placeholder="Email :"
          value={email}
          onChange={(event) => setEmail(event.target.value)} />
        <input
          className="w-96 h-10 pl-2 rounded-lg border border-solid bg-transparent"
          placeholder="Password :"
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          className="w-96 h-10 pl-2 rounded-lg border border-solid bg-transparent"
          type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default LoginPage;
