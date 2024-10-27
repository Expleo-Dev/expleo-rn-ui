import React, { useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signIn } from "./ApiServiceCall";
import Popup from "./Popup";
import Icon from "react-native-vector-icons/FontAwesome";

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors: { name?: string; email?: string; password?: string } = {};
    if (!name) newErrors.name = "Name is required";
    else if (name.length > 50)
      newErrors.name = "Name must be 50 characters or less";

    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    else if (!/^[a-zA-Z0-9]*$/.test(password))
      newErrors.password = "Password can only contain letters and numbers";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      console.log("inside validate");
      try {
        const response = await signIn(name, email, password); // Calling the API service
        if (response.status === 200) {
          console.log("Welcome to ReactSpring Bank! ", { name });
          setPopupMessage(`Welcome to ReactSpring Bank, ${name}!`);
          setPopupVisible(true);
        } else {
          console.log("Sign in failed!");
          setPopupMessage("Sign in failed!");
          setPopupVisible(true);
        }
      } catch (error) {
        console.log("An error occurred. Please try again.");
        setPopupMessage("Sign in failed!");
        setPopupVisible(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/image.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Popup
        visible={popupVisible}
        message={popupMessage}
        onClose={() => setPopupVisible(false)}
      />
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.passwordInput}
        />
        <TouchableOpacity
          onPress={() => setShowPassword((prev) => !prev)}
          style={styles.iconContainer}
        >
          <Icon
            name={showPassword ? "eye-slash" : "eye"}
            size={20}
            color="#000"
          />
        </TouchableOpacity>
      </View>
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}
      <Button title="Sign In" onPress={handleSubmit} />
      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
        Already have an account? Login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: "100%",
    height: undefined,
    marginBottom: 50,
    aspectRatio: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingRight: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
  },
  iconContainer: {
    padding: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  link: {
    color: "darkblue",
    marginTop: 20,
    textAlign: "center",
  },
});

export default SignIn;
