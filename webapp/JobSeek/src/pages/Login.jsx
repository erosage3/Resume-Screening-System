import { useState } from "react";
import { loginUser } from "../auth";

export default function Login() {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [response, setResponse] = useState(null);
const [error, setError] = useState(null);

const handleLogin = async (e) => {
e.preventDefault();
setError(null);
try {
const res = await loginUser({ username, password });
if (res.access_token) {
setResponse(res);
// You could also store the token in localStorage:
// localStorage.setItem("token", res.access_token);
} else {
setError(res.detail || "Login failed");
}
} catch (err) {
setError("Server error");
}
};

return (
<div style={{ padding: "1rem" }}>
<h2>Login</h2>
<form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "300px" }}>
<input
type="text"
placeholder="Username"
value={username}
onChange={(e) => setUsername(e.target.value)}
required
/>
<input
type="password"
placeholder="Password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
/>
<button type="submit">Login</button>
</form>
{response && (
<div style={{ marginTop: "1rem" }}>
<h4>Login Successful</h4>
<pre>{JSON.stringify(response, null, 2)}</pre>
</div>
)}
{error && (
<div style={{ color: "red", marginTop: "1rem" }}>
<strong>{error}</strong>
</div>
)}
</div>
);
}