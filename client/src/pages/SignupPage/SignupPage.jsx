import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import Header from "../../components/Header/Header";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };
    authService
      .signup(requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <>
      <Header />
      <div className="pt-10 flex flex-col items-center justify-center gap-10 h-full">
        <h1 className="text-3xl">Sign Up</h1>
        <form onSubmit={handleSignupSubmit} className="flex flex-col justify-center items-center gap-5 _login">
          <input
            className="w-96 h-10 pl-2 rounded-lg border border-solid border-slate-800 bg-transparent"
            placeholder="Email :" type="email" name="email" value={email} onChange={handleEmail} />
          <input
            placeholder="Password :"
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            className="w-96 h-10 pl-2 rounded-lg border border-solid border-slate-800 bg-transparent"
          />
          <input
            className="w-96 h-10 pl-2 rounded-lg border border-solid border-slate-800 bg-transparent"
            placeholder="Name:" type="text" name="name" value={name} onChange={handleName} />

          <button className="w-96 h-10 pl-2 rounded-lg border border-solid border-slate-800 bg-transparent font-bold" type="submit">Sign Up</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>Already have account?</p>
        <Link to={"/login"}> Login</Link>
      </div>
    </>

  );
}

export default SignupPage;
