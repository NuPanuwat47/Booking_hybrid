import { StyleSheet, Image, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Colors, Spacing, Typography } from './components/Theme';

const Home = () => {
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Image
          source={require("../assets/image/profile.jpg")}
          style={styles.profile}
        />
  <Text style={[styles.title, { fontSize: Typography.h1 }]}>Hello World</Text>
  <Text style={styles.subtitle}>We are CIS</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Link href={"/about"} style={styles.link}>
              <Text style={styles.btnText}>About Us</Text>
            </Link>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Link href={"/book"} style={styles.link}>
              <Text style={styles.btnText}>Books</Text>
            </Link>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Link href={"/signin"} style={styles.link}>
              <Text style={styles.btnText}>Sign In</Text>
            </Link>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Link href={"/signup"} style={styles.link}>
              <Text style={styles.btnText}>Sign Up</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

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
    alignItems: 'center',
  },
  profile: {
    height: 128,
    width: 128,
    borderRadius: 64,
    marginBottom: Spacing.gap,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.muted,
    marginBottom: Spacing.gap * 2,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: Spacing.radius,
    marginBottom: Spacing.gap,
    alignItems: 'center',
  },
  link: {
    width: '100%',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
