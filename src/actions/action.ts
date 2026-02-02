import axios from "axios";

interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export async function loginAction(
  username: string,
  password: string
): Promise<LoginResponse> {
  const host = process.env.NEXT_PUBLIC_HOST_URL;

  try {
    const res = await axios.post(`${host}s/v1/login`, {
      username,
      password,
    });

    return {
      success: true,
      token: res.data.token, // 👈 ชัดเจน
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data?.message || "Login failed",
    };
  }
}
