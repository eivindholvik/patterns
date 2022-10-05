const logIn = async (email, password) => {
  try {
    const response = await fetch(
      "https://nf-api.onrender.com/api/v1/social/auth/login",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const { name } = await response.json();
    return { username: name, logged: true };
  } catch (e) {
    console.log(e);
  }
};

export { logIn };
