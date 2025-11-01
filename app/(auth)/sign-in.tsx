import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please enter valid email or password");
      return;
    }
    setIsSubmitting(true);
    try {
      //call appwrite sign in function
      Alert.alert("Success", "User signed in successfully.");
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 p-5 mt-5 bg-white rounded-lg">
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label="Email"
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        label="Password"
        secureTextEntry={true}
      />
      <CustomButton title="Sign In" isLoading={isSubmitting} onPress={submit} />
      <View className="flex flex-row justify-center gap-2 mt-5">
        <Text className="text-gray-100 base-regular">
          Don't have an account?
        </Text>
        <Link className="base-bold text-primary" href="/sign-up">
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
