import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const register = async () => {
		const api = process.env.REACT_APP_API_URL || "http://localhost:5000";
		try {
					await axios.post(`${api}/api/user/register`, {
						firstName,
						lastName,
						email,
						password
					});
			// after register, navigate to login
			navigate("/");
		} catch (err) {
			console.error("Registration failed", err);
			alert(err.response?.data || "Registration failed");
		}
	};

	return (
		<div>
			<h2>Register</h2>
			<input placeholder="First name" onChange={e => setFirstName(e.target.value)} />
			<input placeholder="Last name" onChange={e => setLastName(e.target.value)} />
			<input placeholder="Email" onChange={e => setEmail(e.target.value)} />
			<input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
			<button onClick={register}>Register</button>
		</div>
	);
}
