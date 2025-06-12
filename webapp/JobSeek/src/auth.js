export async function registerUser(payload) {
const response = await fetch("http://localhost:8000/auth/register", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(payload),
});
return await response.json();
}

export async function loginUser(payload) {
const response = await fetch("http://localhost:8000/auth/login", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(payload),
});
return await response.json();
}