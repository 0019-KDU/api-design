//Login Users
const loginUsers = async (email, password) => {
  if (!email || !password) {
    throw Error("Äll fields are required");
  }

  const res = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("email", data.email);

  return data;
};

//Register Users
const registerUsers = async (email, password, passwordconfirm) => {
  if (!email || !password || !passwordconfirm) {
    throw Error("Äll fields are required");
  }

  if (password !== passwordconfirm) {
    throw Error("password does not match");
  }

  const res = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("email", data.email);

  return data;
};

export { loginUsers, registerUsers };
