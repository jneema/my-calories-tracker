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

const ForgotPassword = () => {
  const router = useRouter();
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textY = useRef(new Animated.Value(20)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  const [focused, setFocused] = useState(null);
  const [formData, setFormData] = useState({ email: "" });
  const [sent, setSent] = useState(false);

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

  const handleSend = () => {
    // simulate request delay
    setTimeout(() => setSent(true), 800);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <LinearGradient
        colors={["#14b8a6", "#06b6d4", "#2563eb"]}
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
          {/* Logo */}
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
            <Ionicons
              name={sent ? "checkmark-circle" : "mail-outline"}
              size={52}
              color={sent ? "#22c55e" : "#06b6d4"}
            />
          </Animated.View>

          {/* Content */}
          <Animated.View
            style={{
              alignItems: "center",
              marginTop: 20,
              opacity: textOpacity,
              transform: [{ translateY: textY }],
            }}
          >
            {!sent ? (
              <>
                <Text
                  style={{
                    color: "white",
                    fontSize: 38,
                    fontWeight: "300",
                    letterSpacing: -1,
                  }}
                >
                  Forgot Password?
                </Text>
                <Text
                  style={{
                    color: "rgba(255,255,255,0.9)",
                    fontSize: 16,
                    marginTop: 6,
                    marginBottom: 30,
                  }}
                >
                  Enter your email to receive reset instructions.
                </Text>
              </>
            ) : (
              <>
                <Text
                  style={{
                    color: "white",
                    fontSize: 36,
                    fontWeight: "400",
                    textAlign: "center",
                  }}
                >
                  Email Sent!
                </Text>
                <Text
                  style={{
                    color: "rgba(255,255,255,0.9)",
                    fontSize: 16,
                    marginTop: 6,
                    marginBottom: 30,
                    textAlign: "center",
                  }}
                >
                  We’ve sent a password reset link to{" "}
                  <Text style={{ fontWeight: "600" }}>{formData.email}</Text>.
                  Please check your inbox.
                </Text>
              </>
            )}
          </Animated.View>

          {/* Form or Success */}
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
            {!sent ? (
              <>
                <Text
                  style={{
                    color: "#374151",
                    fontSize: 14,
                    fontWeight: "500",
                    marginBottom: 6,
                  }}
                >
                  Email
                </Text>
                <TextInput
                  value={formData.email}
                  onChangeText={(t) => updateField("email", t)}
                  placeholder="yourname@example.com"
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  style={{
                    backgroundColor: "#fff",
                    borderWidth: 2,
                    borderColor:
                      focused === "email" ? "#06b6d4" : "rgba(229,231,235,1)",
                    borderRadius: 12,
                    paddingVertical: 12,
                    paddingHorizontal: 14,
                    fontSize: 15,
                    color: "#111827",
                    shadowColor: focused === "email" ? "#06b6d4" : "transparent",
                    shadowOpacity: 0.25,
                    shadowRadius: focused === "email" ? 10 : 0,
                    elevation: focused === "email" ? 3 : 0,
                    marginBottom: 10,
                  }}
                />

                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={handleSend}
                  style={{
                    backgroundColor: "#06b6d4",
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
                    Send reset link
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => router.push("/auth/sign-in")}
                style={{
                  borderColor: "#2563eb",
                  borderWidth: 2,
                  paddingVertical: 14,
                  borderRadius: 12,
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    color: "#2563eb",
                    fontSize: 16,
                    fontWeight: "600",
                    letterSpacing: 0.3,
                  }}
                >
                  Back to Sign In
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
