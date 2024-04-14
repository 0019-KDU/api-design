import { useContext, useState } from "react";
import Alert from "../../Components/Alert";
import { registerUsers } from "../../Controllers/UsersControllers";
import { UserContext } from "../../contexts/UserContexts";
import { useNavigate } from "react-router-dom";

const Register = () => {
  //Use user state
  const { setUser } = useContext(UserContext);

  //Use the navigate hook
  const navigate = useNavigate();

  //Error State
  const [error, setError] = useState(null);

  //From Data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  //Handle login
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUsers(
        formData.email,
        formData.password,
        formData.confirmPassword
      );

      setUser({ email: formData.email, posts: [] });

      //navigate to the dashboard
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <section className="card">
      <h1 className="title">Create an new account</h1>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="input"
          autoFocus
        />
        <input
          type="password"
          placeholder="password"
          className="input"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Confirm password"
          className="input"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />
        <button className="btn">Register</button>
      </form>

      {error && <Alert msg={error} />}
    </section>
  );
};

export default Register;
