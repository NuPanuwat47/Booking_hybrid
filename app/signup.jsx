import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, TouchableOpacity } from "react-native";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "expo-router";
import { Colors, Spacing, Typography } from './components/Theme';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) return Alert.alert("Validation", "Please fill all fields");
    if (password !== confirmPassword) return Alert.alert("Validation", "Passwords do not match");
    setLoading(true);
    try {
      const { ok, data } = await register({ email, password });
      if (ok) {
        Alert.alert("Success", "Account created successfully", [{ text: "OK", onPress: () => router.replace("/signin") }]);
      } else {
        Alert.alert("Signup failed", data.message || "Unable to create account");
      }
    } catch (error) {
      Alert.alert("Signup error", String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <View style={styles.card}>
  <Text style={[styles.title, { fontSize: Typography.h1 }]}>Sign Up</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="email@example.com"
          placeholderTextColor={Colors.muted}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor={Colors.muted}
        />
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholder="Confirm Password"
          placeholderTextColor={Colors.muted}
        />
        <TouchableOpacity style={[styles.primaryButton, loading && styles.disabledButton]} onPress={handleSignup} disabled={loading}>
          <Text style={styles.btnText}>{loading ? "Signing up..." : "Sign Up"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.pagePadding,
    justifyContent: 'center',
    flexGrow: 1,
  },
  card: {
    backgroundColor: Colors.card,
    padding: Spacing.gap * 2,
    borderRadius: Spacing.radius,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.gap * 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
    borderRadius: Spacing.radius,
    marginBottom: Spacing.gap,
    backgroundColor: '#fff',
    color: Colors.text,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: Spacing.radius,
    alignItems: 'center',
    marginTop: Spacing.gap,
  },
  disabledButton: {
    backgroundColor: Colors.muted,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
