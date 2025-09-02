import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "./context/AuthContext";
import { BASE_URL } from './config';
import { Colors, Spacing, Shadows, Typography } from './components/Theme';

const BookDetail = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { authFetch, token } = useAuth();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await authFetch(`/api/books/${id}`);
        const data = await response.json().catch(() => ({}));
        setBook(data.book || null);
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const updateData = {
        title: book.title,
        author: book.author,
        description: book.description,
        genre: book.genre,
        year: book.year,
        price: book.price,
        available: !!book.available,
      };
  const response = await authFetch(`/api/books/${id}`, { method: 'PUT', body: updateData });
      if (response.ok) {
    // go back to book list so it can refresh
    router.replace('/book');
      } else {
        const err = await response.json().catch(() => ({}));
        Alert.alert("Update failed", err.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      Alert.alert("Update error", String(error));
    }
  };

  const handleDelete = async () => {
    try {
      console.log('handleDelete invoked');
      // include explicit Authorization header from context token to ensure it's sent
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
      // debug: show whether token is present (do NOT log the token value)
      try {
        console.log('handleDelete -> hasToken=', !!token, 'headers=', headers ? Object.keys(headers) : null);
      } catch (e) {}
      // try direct fetch first so DELETE always sends explicit Authorization header
      try {
        const url = `${BASE_URL}/api/books/${id}`;
        const directHeaders = token ? { Authorization: `Bearer ${token}` } : {};
        const direct = await fetch(url, { method: 'DELETE', headers: directHeaders });
        const directText = await direct.text().catch(() => null);
        console.log('direct fetch DELETE ->', direct.status, directText);
        if (direct.ok) {
          // on success, navigate back to list immediately (same as save)
          router.replace('/book');
          return;
        }

        // if direct failed, log and also try via authFetch for parity
        console.log('direct delete failed, trying authFetch fallback');
        const response = await authFetch(`/api/books/${id}`, { method: 'DELETE', headers });
        let text = await response.text().catch(() => null);
        console.log('authFetch DELETE ->', response.status, text);
        if (response.ok) {
          // on success, navigate back to list immediately (same as save)
          router.replace('/book');
          return;
        }
      } catch (e) {
        console.error('direct fetch error', e);
      }

      // show server message if available
      let errJson = null;
      try {
        errJson = JSON.parse(text || '{}');
      } catch (e) {
        errJson = null;
      }
      Alert.alert("Delete failed", (errJson && errJson.message) || text || "Unknown error");
    } catch (error) {
      console.error("Error deleting book:", error);
      Alert.alert("Delete error", String(error));
    }
  };

  const confirmDelete = () => {
    Alert.alert("Confirm Deletion", "Are you sure you want to delete this book?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: handleDelete },
    ]);
  };

  if (loading) return <ActivityIndicator />;
  if (!book) return <Text style={{ padding: Spacing.gap }}>Book not found.</Text>;

  return (
    <ScrollView style={[styles.page, { backgroundColor: Colors.background }]} contentContainerStyle={styles.content}>
      <View style={[styles.card, Shadows.soft]}>
        <Text style={[styles.title, { fontSize: Typography.h2 }]}>Edit Book</Text>

        <TextInput style={styles.input} value={book.title} onChangeText={(t) => setBook({ ...book, title: t })} placeholder="Title" placeholderTextColor={Colors.muted} />
        <TextInput style={styles.input} value={book.author} onChangeText={(t) => setBook({ ...book, author: t })} placeholder="Author" placeholderTextColor={Colors.muted} />
  <TextInput style={[styles.input, styles.multiline]} value={book.description} onChangeText={(t) => setBook({ ...book, description: t })} placeholder="Description" multiline placeholderTextColor={Colors.muted} />

  <TextInput style={styles.input} value={book.genre || ''} onChangeText={(t) => setBook({ ...book, genre: t })} placeholder="Genre" placeholderTextColor={Colors.muted} />

  <TextInput style={[styles.input, styles.flexItem]} value={String(book.year || '')} onChangeText={(t) => setBook({ ...book, year: Number(t) || 0 })} placeholder="Year" keyboardType="numeric" placeholderTextColor={Colors.muted} />
  <TextInput style={[styles.input, styles.flexItem]} value={String(book.price || '')} onChangeText={(t) => setBook({ ...book, price: Number(t) || 0 })} placeholder="Price" keyboardType="numeric" placeholderTextColor={Colors.muted} />


        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleUpdate}>
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => { try { console.log('Delete button pressed'); } catch(e){}; handleDelete(); }}>
            <Text style={styles.deleteBtnText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default BookDetail;
const styles = StyleSheet.create({
  page: { flex: 1 },
  content: { padding: Spacing.pagePadding },
  card: {
    backgroundColor: Colors.card,
    padding: Spacing.gap + 6,
    borderRadius: Spacing.radius,
    marginBottom: Spacing.gap,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: { fontWeight: '700', color: Colors.text, marginBottom: Spacing.gap },
  input: { borderWidth: 1, borderColor: Colors.border, padding: 10, borderRadius: 8, marginBottom: 10, color: Colors.text },
  multiline: { minHeight: 80, textAlignVertical: 'top' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  flexItem: { flex: 1 },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.gap },
  primaryButton: { flex: 1, backgroundColor: Colors.primary, paddingVertical: 12, borderRadius: Spacing.radius, alignItems: 'center', marginRight: 8 },
  btnText: { color: '#fff', fontWeight: '600' },
  deleteButton: { flex: 1, backgroundColor: Colors.destructive || '#ff4d4f', paddingVertical: 12, borderRadius: Spacing.radius, alignItems: 'center' },
  deleteBtnText: { color: '#fff', fontWeight: '600' },
});
