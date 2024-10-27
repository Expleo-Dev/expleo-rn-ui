import axios from "axios";

export const signIn = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post("http://10.0.2.2:8080/users", {
      name,
      email,
      password,
    });
    console.log("response :----- ");
    // console.log(response);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "API request failed");
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
};
