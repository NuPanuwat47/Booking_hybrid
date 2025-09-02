import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, TouchableOpacity } from "react-native";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "expo-router";
import { Colors, Spacing, Shadows, Typography } from './components/Theme';

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSignin = async () => {
    if (!email || !password) return Alert.alert("Validation", "Please enter email and password");
    setLoading(true);
    try {
      const { ok, data } = await login(email, password);
      if (ok && data.token) {
        router.replace("/book");
      } else {
        Alert.alert("Signin failed", data.message || "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Signin error", String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <View style={styles.card}>
  <Text style={[styles.title, { fontSize: Typography.h1 }]}>Sign In</Text>
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
        <TouchableOpacity style={[styles.primaryButton, loading && styles.disabledButton]} onPress={handleSignin} disabled={loading}>
          <Text style={styles.btnText}>{loading ? "Signing in..." : "Sign In"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Signin;

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
