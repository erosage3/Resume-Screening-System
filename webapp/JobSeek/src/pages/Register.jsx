import { useState } from "react";
import { registerUser } from "../auth";

export default function Register() {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [response, setResponse] = useState(null);

const handleRegister = async (e) => {
e.preventDefault();
const res = await registerUser({ username, password });
setResponse(res);
};

return (
<div>
<h2>Register</h2>
<form onSubmit={handleRegister}>
<input type="text" placeholder="Username" value={username}
onChange={(e) => setUsername(e.target.value)} />
<input type="password" placeholder="Password" value={password}
onChange={(e) => setPassword(e.target.value)} />
<button type="submit">Register</button>
</form>
{response && <pre>{JSON.stringify(response, null, 2)}</pre>}
</div>
);
}