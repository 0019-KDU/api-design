import { useContext, useState } from "react";
import Alert from "../../Components/Alert";
import { loginUsers } from "../../Controllers/UsersControllers";
import { UserContext } from "../../contexts/UserContexts";
import { useNavigate } from "react-router-dom";

const Login = () => {
  //Use user context
  const { setUser } = useContext(UserContext);
  //Error State
  const [error, setError] = useState(null);

  //Use navigation hook
  const navigate = useNavigate();

  //From Data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      //Login the user
      await loginUsers(email, password);
      //Update the user state
      setUser({ email, posts: [] });

      //navigate to the dashboard
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <section className="card">
      <h1 className="title">Login to your account</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          autoFocus
        />
        <input
          type="password"
          placeholder="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn">Login</button>
      </form>

      {error && <Alert msg={error} />}
    </section>
  );
};

export default Login;
