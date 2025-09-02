import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, TouchableOpacity } from "react-native";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "expo-router";
import { Colors, Spacing, Shadows, Typography } from './components/Theme';

const BookNew = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState(2024);
  const [price, setPrice] = useState(0);
  const { authFetch } = useAuth();
  const router = useRouter();

  const handleCreate = async () => {
    if (!title || !author) return Alert.alert("Validation", "Title and author are required");
    try {
      const res = await authFetch('/api/books', { method: 'POST', body: { title, author, description, genre, year: Number(year), price: Number(price), available: true } });
      if (res.ok) {
        // redirect to list immediately after create
        router.replace('/book');
      } else {
        const err = await res.json().catch(() => ({}));
        Alert.alert("Create failed", err.message || "Unknown error");
      }
    } catch (error) {
      Alert.alert("Create error", String(error));
    }
  };

  return (
    <ScrollView style={style.page} contentContainerStyle={style.content}>
      <View style={[style.card, Shadows.soft]}>
        <Text style={[style.title, { fontSize: Typography.h2 }]}>Create Book</Text>
        <TextInput style={style.input} value={title} onChangeText={setTitle} placeholder="Title" placeholderTextColor={Colors.muted} />
        <TextInput style={style.input} value={author} onChangeText={setAuthor} placeholder="Author" placeholderTextColor={Colors.muted} />
        <TextInput style={[style.input, style.multiline]} value={description} onChangeText={setDescription} placeholder="Description" multiline placeholderTextColor={Colors.muted} />
        <TextInput style={style.input} value={genre} onChangeText={setGenre} placeholder="Genre (e.g. Dystopian)" placeholderTextColor={Colors.muted} />
        <TextInput style={[style.input, style.flexItem]} value={String(year)} onChangeText={(t) => setYear(Number(t) || 0)} placeholder="Year" keyboardType="numeric" placeholderTextColor={Colors.muted} />
        <TextInput style={[style.input, style.flexItem]} value={String(price)} onChangeText={(t) => setPrice(Number(t) || 0)} placeholder="Price" keyboardType="numeric" placeholderTextColor={Colors.muted} />

        <View style={style.actionsRow}>
          <TouchableOpacity style={[style.primaryButton]} onPress={handleCreate}>
            <Text style={style.btnText}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default BookNew;

const style = StyleSheet.create({
  page: { flex: 1 },
  content: { padding: Spacing.pagePadding },
  card: {
    backgroundColor: Colors.card,
    padding: Spacing.gap + 8,
    borderRadius: Spacing.radius,
    marginBottom: Spacing.gap,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: { fontWeight: '700', color: Colors.text, marginBottom: Spacing.gap },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    color: Colors.text,
    backgroundColor: Colors.inputBackground || Colors.card,
  },
  multiline: { minHeight: 100, textAlignVertical: 'top' },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  flexItem: { flex: 1 },
  actionsRow: { marginTop: Spacing.gap },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: Spacing.radius,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: '600' },
});
