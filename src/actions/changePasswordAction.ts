// src/actions/changePasswordAction.ts
import axios from "axios";

export async function changePasswordAction(
  username: string,
  oldPassword: string,
  newPassword: string
) {
  const host = process.env.NEXT_PUBLIC_HOST_URL;

  try {
    const res = await axios.post(`${host}s/v1/change-password`, {
      username,
      oldPassword,
      newPassword,
    });

    return {
      success: true,
      message: res.data.message,
    };
  } catch (err: any) {
    return {
      success: false,
      message:
        err.response?.data?.message || "Change password failed",
    };
  }
}
