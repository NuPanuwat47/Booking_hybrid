import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from 'react-native';
import { useAuth } from './context/AuthContext';
import { Colors, Spacing, Shadows, Typography } from './components/Theme';

const Book = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authFetch } = useAuth();

  const load = async () => {
    setLoading(true);
    try {
      const res = await authFetch('/api/books?page=1&limit=50');
      const json = await res.json().catch(() => ({}));
      setData(json.books || []);
    } catch (error) {
      console.error('Error fetching book data:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  return (
    <View style={[styles.page, { backgroundColor: Colors.background }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.pageTitle, { fontSize: Typography.h2 }]}>Books</Text>
        <TouchableOpacity style={styles.newBtn} onPress={() => router.push('/book_new')}>
          <Text style={styles.newBtnText}>New</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : data.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.empty}>No books found.</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.list}
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push(`/book_detail?id=${item._id}`)} activeOpacity={0.8}>
              <View style={[styles.card, Shadows.soft]}>
                <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
                <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{item.author}</Text>
                <Text style={styles.small} numberOfLines={1} ellipsizeMode="tail">{item.genre} • {item.year}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default Book;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: Spacing.pagePadding,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.gap,
  },
  pageTitle: {
    fontWeight: '700',
    color: Colors.text,
  },
  newBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: Spacing.radius,
  },
  newBtnText: { color: '#fff', fontWeight: '600' },
  list: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: Colors.card,
    padding: Spacing.gap + 6,
    borderRadius: Spacing.radius,
    marginBottom: Spacing.gap,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  title: { fontSize: Typography.body, fontWeight: '700', color: Colors.text, marginBottom: 6, lineHeight: Math.round(Typography.body * 1.3) },
  text: { color: Colors.muted, marginBottom: 4, lineHeight: Math.round(Typography.body * 1.2) },
  small: { color: Colors.muted, fontSize: Math.round(Typography.body * 0.85) },
  center: { alignItems: 'center', marginTop: 40 },
  empty: { color: Colors.muted },
});
