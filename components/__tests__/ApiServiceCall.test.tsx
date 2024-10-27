import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { signIn } from "../ApiServiceCall";

describe("signIn function", () => {
  let mock: AxiosMockAdapter;

  beforeAll(() => {
    mock = new AxiosMockAdapter(axios);
  });

  afterEach(() => {
    mock.reset(); // Reset the mock after each test
  });

  test("should return response on successful sign-in", async () => {
    const mockResponse = { message: "User signed in successfully!" };

    mock.onPost("http://10.0.2.2:8080/users").reply(200, mockResponse);

    const response = await signIn(
      "Test User",
      "Test@example.com",
      "password123"
    );

    expect(response.data).toEqual(mockResponse);
  });

  test("should throw an error when sign-in fails", async () => {
    mock
      .onPost("http://10.0.2.2:8080/users")
      .reply(400, { message: "Invalid credentials" });

    await expect(
      signIn("Test User", "Test@example.com", "wrongpassword")
    ).rejects.toThrow("Invalid credentials");
  });
});
