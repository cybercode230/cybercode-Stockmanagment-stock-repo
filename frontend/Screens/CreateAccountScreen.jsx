import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { useAuth } from "../App/context/AuthContext";
import { Picker } from "@react-native-picker/picker";


export default function CreateAccountScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("business_owner");
  const { onLogin } = useAuth();

  const register = async () => {
    setLoading(true);
    try {
     const registerResponse = await axios.post(
       "http://192.168.1.2:8000/auth/users/",
       {
         email,
         username,
         password,
         user_type: userType,
       }
     );

      if (registerResponse.status === 201) {
        await login();
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    setLoading(true);
    const result = await onLogin(username, password);
    setLoading(false);
    if (result && result.error) {
      alert(result.msg);
    } else {
      navigation.navigate("Loading");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1B1A25" }}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.header}>
            <Image
              alt="App Logo"
              resizeMode="contain"
              style={styles.headerImg}
              source={require("../assets/logo.png")}
            />
            <Text style={styles.title}>
              Create a{" "}
              <Text style={{ alignItems: "center", justifyContent: "center" }}>
                Account
              </Text>
            </Text>
            <Text style={styles.subtitle}>Join us to manage your stock</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email address</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
                onChangeText={setEmail}
                value={email}
                placeholder="josue@gmail.com"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                // keyboardType="email-address"
                onChangeText={setUserName}
                value={username}
                placeholder="Enter your username"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={setPassword}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={password}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>User Type</Text>
              <Picker
                selectedValue={userType}
                style={styles.picker}
                onValueChange={(itemValue) => setUserType(itemValue)}>
                <Picker.Item
                  label="Business Owner"
                  value="business_owner"
                />
                <Picker.Item
                  label="Stock Manager"
                  value="stock_manager"
                />
              </Picker>
            </View>

            <View style={styles.formAction}>
              <TouchableOpacity onPress={register}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Create Account</Text>
                </View>
              </TouchableOpacity>
            </View>

            <Text
              onPress={() => navigation.navigate("Login")}
              style={styles.formLink}>
              Already have an account? Sign in
            </Text>
          </View>
        </KeyboardAwareScrollView>

        {loading && (
          <ActivityIndicator
            size="large"
            color="#075eec"
            style={styles.loading}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    marginTop:-20,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    fontFamily: "Roboto",
  },
  title: {
    fontSize: 31,
    fontWeight: "700",
    color: "#d9d9d9",
    marginBottom: 1,
    marginTop:-5,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
    width: 300,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 36,
  },
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    fontWeight: "600",
    color: "#075eec",
    textAlign: "center",
  },
  formFooter: {
    fontSize: 15,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
    marginTop: 28,
  },
  input: {
    marginVertical: 8,
    flexDirection: "column",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#d9d9d9",
    marginBottom: 6,
  },
  inputControl: {
    backgroundColor: "#ffffff",
    borderColor: "#e5e7eb",
    borderRadius: 6,
    borderWidth: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#1D2A32",
    paddingHorizontal: 12,
    paddingVertical: 10,
    height: 46,
  },
  picker: {
    backgroundColor: "#ffffff",
    borderColor: "#e5e7eb",
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#1D2A32",
    height: 46,
  },
  btn: {
    backgroundColor: "#C500B1",
    borderRadius: 6,
    marginTop: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    zIndex: 10,
    elevation: 10,
  },
});


