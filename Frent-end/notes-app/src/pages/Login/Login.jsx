import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../compenent/Navbar/Navbar";
import PassInput from "../../compenent/PassInput/PassInput"
import { validateEmail } from "../../utils/Helper";
import AxiosInstance from "../../utils/AxiosInstance";

const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!pass) {
            setError("Please enter the password.");
            return;
        }
        setError("");

        // login api call
        try {
            const response = await AxiosInstance.post("/login", {
                email: email,
                password: pass,
            });
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate("/dashbord");
            } else {
                setError("Login failed. Please check your credentials and try again.");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again later.");
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center mt-28">
                <div className="w-96 border rounded bg-white px-7 py-10">
                    <form onSubmit={handleLogin}>
                        <h1 className="text-2xl text-center mb-7">Login</h1>
                        <input
                            type="email"
                            placeholder="Email"
                            className="input-box"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <PassInput
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            placeHolder="Password"
                        />
                        {error && <p className="text-red-500 text-sx pb-1">{error}</p>}
                        <button className="btn-primary" type="submit">
                            Login
                        </button>
                        <p className="text-sm text-center mt-4">
                            Not Registered Yet?{" "}
                            <Link to="/signup" className="font-medium text-primary underline">
                                Create an account
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;