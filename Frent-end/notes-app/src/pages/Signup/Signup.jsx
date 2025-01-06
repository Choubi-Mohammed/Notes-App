import { useState } from "react";
import Navbar from "../../compenent/Navbar/Navbar";
import PassInput from "../../compenent/PassInput/PassInput";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/Helper";
import AxiosInstance from "../../utils/AxiosInstance";

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }
    if (!name) {
      setError("Please enter your name.");
      return;
    }
    if (!pass) {
      setError("Please enter the password.");
      return;
    }

    setError("");
    try {
      const response = await AxiosInstance.post('/create-account/', {
      name: name,
      email: email,
      password: pass,
      isAdmin: false,
      });

      if (response.status === 200 || response.status === 201) {
      console.log("Registration successful:", response.data);
      window.location.href = '/login';
      } else {
      setError(response.data.message || "Registration error.");
      }
    } catch (err) {
      console.error("An error occurred:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h1 className="text-2xl text-center mb-7">Sign Up</h1>
            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PassInput value={pass} onChange={(e) => setPass(e.target.value)} />
            {error && <p className="text-red-500 text-sx pb-1">{error}</p>}
            <button className="btn-primary" type="submit">
              Create account
            </button>
            <p className="text-sm text-center mt-4">
              Already have an account{" "}
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
