// import React, { useState } from "react";
// import {
//   StyleSheet,
//   SafeAreaView,
//   View,
//   Image,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   ActivityIndicator,
// } from "react-native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// import { useAuth } from "../App/context/AuthContext";

// export default function CreateAccountScreen({ navigation }) {
//   const [loading, setLoading] = useState(false);
//   // const [form, setForm] = useState({
//   //   email: "",
//   //   password: "",
//   // });
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState("");
//   const { onLogin, onRegister } = useAuth();

//   const handleSignUp = () => {
//     setLoading(true);
//     // Simulate an API call
//     setTimeout(() => {
//       setLoading(false);
//       navigation.navigate("home");
//     }, 2000);
//   };

//   const login = async () => {
//     const result = (await onLogin) | (email, password);
//     if (result && result.error) {
//       alert(result.msg);
//     }
//   };


//   const register = async () => {
//     const result = (await onRegister) | (email, password);
//     if (result && result.error) {
//       alert(result.msg);
//     } else {
//       login();
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
//       <View style={styles.container}>
//         <KeyboardAwareScrollView>
//           <View style={styles.header}>
//             <Image
//               alt="App Logo"
//               resizeMode="contain"
//               style={styles.headerImg}
//               source={{
//                 uri: "https://assets.withfra.me/SignIn.2.png",
//               }}
//             />

//             <Text style={styles.title}>
//               Create a <Text style={{ color: "#075eec" }}>MyApp</Text> Account
//             </Text>

//             <Text style={styles.subtitle}>
//               Join us to manage your portfolio and more
//             </Text>
//           </View>

//           <View style={styles.form}>
//             <View style={styles.input}>
//               <Text style={styles.inputLabel}>Email address</Text>

//               <TextInput
//                 autoCapitalize="none"
//                 autoCorrect={false}
//                 clearButtonMode="while-editing"
//                 keyboardType="email-address"
//                 onChangeText={(email) => setForm({ ...form, email })}
//                 placeholder="john@example.com"
//                 placeholderTextColor="#6b7280"
//                 style={styles.inputControl}
//                 value={form.email}
//               />
//             </View>

//             <View style={styles.input}>
//               <Text style={styles.inputLabel}>Password</Text>

//               <TextInput
//                 autoCorrect={false}
//                 clearButtonMode="while-editing"
//                 onChangeText={(password) => setForm({ ...form, password })}
//                 placeholder="********"
//                 placeholderTextColor="#6b7280"
//                 style={styles.inputControl}
//                 secureTextEntry={true}
//                 value={form.password}
//               />
//             </View>

//             <View style={styles.formAction}>
//               <TouchableOpacity onPress={handleSignUp}>
//                 <View style={styles.btn}>
//                   <Text
//                     style={styles.btnText}
//                     onPress={register}>
//                     Sign Up
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             </View>

//             <Text
//               onPress={() => navigation.navigate("Login")}
//               style={styles.formLink}>
//               Already have an account?
//             </Text>
//           </View>
//         </KeyboardAwareScrollView>

//         {loading && (
//           <ActivityIndicator
//             size="large"
//             color="#075eec"
//             style={styles.loading}
//           />
//         )}
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: 24,
//     paddingHorizontal: 0,
//     flexGrow: 1,
//     flexShrink: 1,
//     flexBasis: 0,
//   },
//   title: {
//     fontSize: 31,
//     fontWeight: "700",
//     color: "#1D2A32",
//     marginBottom: 6,
//   },
//   subtitle: {
//     fontSize: 15,
//     fontWeight: "500",
//     color: "#929292",
//   },
//   header: {
//     alignItems: "center",
//     justifyContent: "center",
//     marginVertical: 36,
//   },
//   headerImg: {
//     width: 80,
//     height: 80,
//     alignSelf: "center",
//     marginBottom: 36,
//   },
//   form: {
//     marginBottom: 24,
//     paddingHorizontal: 24,
//     flexGrow: 1,
//     flexShrink: 1,
//     flexBasis: 0,
//   },
//   formAction: {
//     marginTop: 4,
//     marginBottom: 16,
//   },
//   formLink: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#075eec",
//     textAlign: "center",
//   },
//   input: {
//     marginBottom: 16,
//   },
//   inputLabel: {
//     fontSize: 17,
//     fontWeight: "600",
//     color: "#222",
//     marginBottom: 8,
//   },
//   inputControl: {
//     height: 50,
//     backgroundColor: "#fff",
//     paddingHorizontal: 16,
//     borderRadius: 12,
//     fontSize: 15,
//     fontWeight: "500",
//     color: "#222",
//     borderWidth: 1,
//     borderColor: "#C9D3DB",
//     borderStyle: "solid",
//   },
//   btn: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 30,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderWidth: 1,
//     backgroundColor: "#075eec",
//     borderColor: "#075eec",
//   },
//   btnText: {
//     fontSize: 18,
//     lineHeight: 26,
//     fontWeight: "600",
//     color: "#fff",
//   },
//   loading: {
//     position: "absolute",
//     left: "50%",
//     top: "50%",
//     transform: [{ translateX: -25 }, { translateY: -25 }],
//   },
// });



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

export default function CreateAccountScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, onRegister } = useAuth();

  const register = async () => {
    setLoading(true);
    const result = await onRegister(email, password);
    setLoading(false);
    if (result && result.error) {
      alert(result.msg);
    } else {
      await login();
    }
  };

  const login = async () => {
    setLoading(true);
    const result = await onLogin(email, password);
    setLoading(false);
    if (result && result.error) {
      alert(result.msg);
    } else {
      navigation.navigate("home");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.header}>
            <Image
              alt="App Logo"
              resizeMode="contain"
              style={styles.headerImg}
              source={{
                uri: "https://assets.withfra.me/SignIn.2.png",
              }}
            />
            <Text style={styles.title}>
              Create a <Text style={{ color: "#075eec" }}>MyApp</Text> Account
            </Text>
            <Text style={styles.subtitle}>
              Join us to manage your portfolio and more
            </Text>
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
    color: "#1D2A32",
    marginBottom: 6,
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
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    letterSpacing: 0.15,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
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
    backgroundColor: "#075eec",
    borderColor: "#075eec",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
  loading: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});
