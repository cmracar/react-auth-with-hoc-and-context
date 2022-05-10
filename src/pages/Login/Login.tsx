import { useEffect, useState } from "react";
import { useAuth, User } from "../../contexts/AuthContext";
import "./Login.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { user, login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<User | undefined>(undefined);

    useEffect(() => {
        if (user !== undefined) {  // There is no cookie so if you refresh the page to go login page, user data will delete.
            navigate("/dashboard");
        }
    }, []);

    const handleLogin = () => {
        if (formData?.username && formData?.password) {
            login(formData?.username, formData?.password)
        }
    }

    return (
        <>
            <div className="login-container">
                <div className="center-box">
                    <div>
                        <h2>Login Page</h2>
                    </div>
                    <div className="form">
                        <input type="text" onChange={(e) => setFormData({ ...formData, username: e.target.value })} placeholder={"Username"} defaultValue={formData?.username} name="username" />
                        <input type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder={"Password"} defaultValue={formData?.password} name="password" />
                        <button onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Login;