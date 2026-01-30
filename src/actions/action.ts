import axios from "axios";

export async function loginAction(username: string, password: string) {
  const host = process.env.NEXT_PUBLIC_HOST_URL;

  try {
    const response = await axios.post(`${host}/s/v1/login`, {
      username,
      password,
    });

    if (response.status !== 200) {
      throw new Error("Login failed");
    }
    const data = response.data;
    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}
