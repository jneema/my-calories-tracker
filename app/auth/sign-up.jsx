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
import Checkbox from "expo-checkbox";

const SignUp = () => {
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textY = useRef(new Animated.Value(20)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  const [isChecked, setIsChecked] = useState(false);
  const [focused, setFocused] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
        colors={["#3b82f6", "#6366f1", "#8b5cf6"]}
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
              <Ionicons name="restaurant" size={48} color="#8b5cf6" />
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
                Create Account
              </Text>
              <Text
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: 16,
                  marginTop: 6,
                  marginBottom: 30,
                }}
              >
                Start your health journey today.
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
                label: "Full Name",
                key: "name",
                placeholder: "Enter your name",
              },
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
              {
                label: "Confirm Password",
                key: "confirmPassword",
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
                      focused === field.key ? "#6366f1" : "rgba(229,231,235,1)",
                    borderRadius: 12,
                    paddingVertical: 12,
                    paddingHorizontal: 14,
                    fontSize: 15,
                    color: "#111827",
                    shadowColor:
                      focused === field.key ? "#6366f1" : "transparent",
                    shadowOpacity: 0.25,
                    shadowRadius: focused === field.key ? 10 : 0,
                    elevation: focused === field.key ? 3 : 0,
                  }}
                />
              </View>
            ))}

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Checkbox
                value={isChecked}
                onValueChange={setIsChecked}
                color={isChecked ? "#3b82f6" : undefined}
              />
              <Text style={{ color: "black", marginLeft: 8 }}>
                I agree to the Terms & Conditions and Privacy Policy
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.85}
              style={{
                backgroundColor: "#6366f1",
                paddingVertical: 14,
                borderRadius: 12,
                alignItems: "center",
                marginTop: 10,
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
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
