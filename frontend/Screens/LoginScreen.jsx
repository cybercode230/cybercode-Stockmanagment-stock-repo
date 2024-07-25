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
import { useAuth } from "../App/context/AuthContext";

export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin } = useAuth();

  const login = async () => {
    setLoading(true);
    try {
      const result = await onLogin(email, password);

      if (result && !result.error) {
        switch (result.user_type) {
          case "business_owner":
            navigation.navigate("BusinessOwnerHome");
            break;
          case "stock_manager":
            navigation.navigate("StockManagerHome");
            break;
          default:
            navigation.navigate("Home");
            break;
        }
      } else {
        alert(result.msg || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
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
              Sign in to{" "}
              <Text
                style={{ color: "#C500B1", fontSize: 30, fontWeight: "800" }}>
                SMP
              </Text>
            </Text>
            <Text style={styles.subtitle}>Get access to your</Text>
            <Text style={styles.subtitle}>Stock Master Pro. Get In</Text>
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

            <View style={styles.formAction}>
              <TouchableOpacity onPress={login}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Sign in</Text>
                </View>
              </TouchableOpacity>
            </View>

            <Text
              onPress={() => navigation.navigate("CreateAccount")}
              style={styles.formLink}>
              Forgot password?
            </Text>
          </View>
        </KeyboardAwareScrollView>

        <TouchableOpacity
          onPress={() => navigation.navigate("CreateAccount")}
          style={{ marginTop: "auto" }}>
          <Text style={styles.formFooter}>
            Don't have an account?{" "}
            <Text style={{ textDecorationLine: "underline" }}>Sign up</Text>
          </Text>
        </TouchableOpacity>

        {loading && (
          <ActivityIndicator
            size="xlarge"
            color="#C500B1"
            style={styles.loading}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
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
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
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
    color: "#C500B1",
    textAlign: "center",
  },
  formFooter: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
    letterSpacing: 0.15,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#d9d9d9",
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#C9D3DB",
    borderStyle: "solid",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#C500B1",
    borderColor: "#C500B1",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "800",
    color: "#fff",
  },
  loading: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});
