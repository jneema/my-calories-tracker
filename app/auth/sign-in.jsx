import {
  View,
  Text,
  Animated,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
  const router = useRouter();
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textY = useRef(new Animated.Value(20)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  const [focused, setFocused] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const updateField = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(textY, {
        toValue: 0,
        duration: 500,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 500,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <LinearGradient
        colors={["#f97316", "#f43f5e", "#db2777"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
            paddingTop: 80,
            paddingHorizontal: 20,
            paddingBottom: 40,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo and Title */}
          <View style={{ alignItems: "center", zIndex: 10 }}>
            <Animated.View
              style={{
                width: 96,
                height: 96,
                backgroundColor: "white",
                borderRadius: 24,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.3,
                shadowRadius: 20,
                elevation: 10,
                opacity: logoOpacity,
                transform: [{ scale: logoScale }],
              }}
            >
              <Ionicons name="restaurant" size={48} color="#f43f5e" />
            </Animated.View>

            <Animated.View
              style={{
                alignItems: "center",
                marginTop: 20,
                opacity: textOpacity,
                transform: [{ translateY: textY }],
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 38,
                  fontWeight: "300",
                  letterSpacing: -1,
                }}
              >
                Welcome Back{" "}
              </Text>
              <Text
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: 16,
                  marginTop: 6,
                  marginBottom: 30,
                }}
              >
                Sign in to continue tracking{" "}
              </Text>
            </Animated.View>
          </View>

          {/* Form */}
          <View
            style={{
              width: "100%",
              backgroundColor: "rgba(255,255,255,0.95)",
              borderRadius: 20,
              padding: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 10,
              elevation: 6,
            }}
          >
            {[
              {
                label: "Email",
                key: "email",
                placeholder: "yourname@example.com",
              },
              {
                label: "Password",
                key: "password",
                placeholder: "•••••••",
                secure: true,
              },
            ].map((field) => (
              <View key={field.key} style={{ marginBottom: 15 }}>
                <Text
                  style={{
                    color: "#374151",
                    fontSize: 14,
                    fontWeight: "500",
                    marginBottom: 6,
                  }}
                >
                  {field.label}
                </Text>
                <TextInput
                  value={formData[field.key]}
                  onChangeText={(t) => updateField(field.key, t)}
                  placeholder={field.placeholder}
                  secureTextEntry={field.secure}
                  onFocus={() => setFocused(field.key)}
                  onBlur={() => setFocused(null)}
                  style={{
                    backgroundColor: "#fff",
                    borderWidth: 2,
                    borderColor:
                      focused === field.key ? "#f43f5e" : "rgba(229,231,235,1)",
                    borderRadius: 12,
                    paddingVertical: 12,
                    paddingHorizontal: 14,
                    fontSize: 15,
                    color: "#111827",
                    shadowColor:
                      focused === field.key ? "#f43f5e" : "transparent",
                    shadowOpacity: 0.25,
                    shadowRadius: focused === field.key ? 10 : 0,
                    elevation: focused === field.key ? 3 : 0,
                  }}
                />
              </View>
            ))}

            <TouchableOpacity
              onPress={() => router.push("/auth/forgot-password")}
            >
              <Text
                style={{
                  color: "black",
                  marginLeft: 8,
                  textAlign: "right",
                  textDecorationLine: "underline",
                }}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.85}
              style={{
                backgroundColor: "#f43f5e",
                paddingVertical: 14,
                borderRadius: 12,
                alignItems: "center",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "600",
                  letterSpacing: 0.3,
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: "black",
                textAlign: "center",
              }}
            >
              or
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                backgroundColor: "rgba(244,63,94,0.05)",
                borderWidth: 2,
                borderColor: "#f43f5e",
                paddingVertical: 14,
                borderRadius: 12,
                alignItems: "center",
                marginTop: 5,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Ionicons name="logo-google" size={16} color="#f43f5e" />
              <Text
                style={{
                  color: "#f43f5e",
                  fontSize: 16,
                  fontWeight: "600",
                  letterSpacing: 0.3,
                  marginLeft: 5,
                }}
              >
                Continue with Google
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={async () => {
                await AsyncStorage.setItem("guestMode", "true");
                router.replace("/(tabs)");
              }}
              style={{
                backgroundColor: "rgba(244,63,94,0.05)",
                borderWidth: 2,
                borderColor: "#f43f5e",
                paddingVertical: 14,
                borderRadius: 12,
                alignItems: "center",
                marginTop: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 15,
              }}
            >
              <Text
                style={{
                  color: "#f43f5e",
                  fontSize: 16,
                  fontWeight: "600",
                  letterSpacing: 0.3,
                  marginLeft: 5,
                }}
              >
                Continue as guest
              </Text>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text style={{ color: "black", fontSize: 15 }}>
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/auth/sign-up")}>
                <Text
                  style={{
                    color: "#f43f5e",
                    fontWeight: "600",
                    textDecorationLine: "underline",
                  }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
