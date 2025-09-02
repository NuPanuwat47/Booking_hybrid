import React from 'react';
import { Image, Text, View, StyleSheet, Switch, ScrollView } from 'react-native';
import { useTheme } from './context/ThemeContext';

const SkillBadge = ({ skill, theme }) => (
  <View style={[styles.skillBadge, { backgroundColor: theme.surface || '#fff', borderColor: theme.border || '#eee' }]}>
    <Text style={[styles.skillText, { color: theme.text }]}>{skill.name}</Text>
  </View>
);

const AboutScreen = () => {
  const { isDarkMode, toggleTheme, color: currentTheme } = useTheme();
  const dark = !!isDarkMode;

  const skills = [
    { name: 'Python' },
    { name: 'JavaScript' },
    { name: 'TypeScript' },
    { name: 'Java' },
    { name: 'C#' },
    { name: 'HTML/CSS' },
  ];

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: currentTheme.background || '#fff' }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: currentTheme.text }]}>My Profile</Text>
        <View style={styles.switchContainer}>
          <Text style={[styles.switchText, { color: currentTheme.text }]}>Dark Mode</Text>
          <Switch
            trackColor={{ false: '#767577', true: currentTheme.primary }}
            thumbColor={dark ? '#ffffff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleTheme}
            value={dark}
          />
        </View>
      </View>

      <View style={styles.profileSection}>
        <View style={[styles.avatarContainer, { borderColor: currentTheme.primary || '#2563EB' }]}> 
          <Image source={require('../assets/image/profile.jpg')} style={styles.avatar} resizeMode="cover" />
        </View>

        <View style={[styles.infoCard, { backgroundColor: currentTheme.surface || '#fff', borderColor: currentTheme.border || '#eee' }]}> 
          <Text style={[styles.name, { color: currentTheme.text }]}>Panuwat Thammabut</Text>
          <Text style={[styles.studentId, { color: currentTheme.primary || '#2563EB' }]}>653450099-8</Text>

          <View style={[styles.divider, { backgroundColor: currentTheme.border || '#eee' }]} />

          <View style={styles.details}>
            <Text style={[styles.subtitle, { color: currentTheme.textSecondary || currentTheme.text }]}>Computer Science</Text>
            <Text style={[styles.subtitle, { color: currentTheme.textSecondary || currentTheme.text }]}>Computer and Information Science</Text>
            <Text style={[styles.university, { color: currentTheme.text }]}>Khon Kaen University</Text>
          </View>

          <View style={[styles.divider, { backgroundColor: currentTheme.border || '#eee' }]} />

          <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>Skills</Text>
          <View style={styles.skillsContainer}>
            {skills.map((skill, index) => (
              <SkillBadge key={index} skill={skill} theme={currentTheme} />
            ))}
          </View>
        </View>
      </View>

      <View style={[styles.courseCard, { backgroundColor: currentTheme.surface || '#fff', borderColor: currentTheme.border || '#eee' }]}> 
        <Text style={[styles.courseHeader, { color: currentTheme.text }]}>IN405109</Text>
        <Text style={[styles.courseTitle, { color: currentTheme.text }]}>Hybrid Mobile Application Programming with React Native</Text>
        <View style={[styles.divider, { backgroundColor: currentTheme.border || '#eee' }]} />
        <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>คำอธิบายรายวิชา</Text>
        <Text style={[styles.description, { color: currentTheme.textSecondary || currentTheme.text }]}>สถาปัตยกรรมฮาร์ดแวร์ คุณลักษณะและข้อจํากัดของอุปกรณ์เคลื่อนที่ เครื่องมือและภาษาที่ใช้สําหรับพัฒนาโปรแกรมประยุกต์บนอุปกรณ์เคลื่อนที่หลากหลายแพลตฟอร์ม การพัฒนาโปรแกรมประยุกต์บนอุปกรณ์เคลื่อนที่โดยใช้ภาษาหลากหลายแพลตฟอร์ม กระบวนการพัฒนาโปรแกรมประยุกต์บนอุปกรณ์เคลื่อนที่หลากหลายแพลตฟอร์ม การใช้หน่วยความจําและส่วนเก็บบันทึกข้อมูล การขออนุญาตและการเข้าถึงส่วนฮาร์ดแวร์ ส่วนติดต่อกับผู้ใช้ การสื่อสารเครือข่ายกับภายนอก การเชื่อมโยงกับระบบเครืองแม่ข่าย การทดสอบโปรแกรมประยุกต์บนอุปกรณ์เคลื่อนที่โดยใช้ระบบคอมพิวเตอร์ ประเด็นด้านความมั่นคง การฝึกปฏิบัติ</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, paddingVertical: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
  headerTitle: { fontSize: 28, fontWeight: '600' },
  switchContainer: { flexDirection: 'row', alignItems: 'center' },
  switchText: { marginRight: 8, fontSize: 16 },
  profileSection: { alignItems: 'center', paddingHorizontal: 16 },
  avatarContainer: { padding: 3, borderRadius: 75, borderWidth: 2, marginBottom: 24, elevation: 4 },
  avatar: { width: 140, height: 140, borderRadius: 70 },
  infoCard: { width: '100%', padding: 24, borderRadius: 20, borderWidth: 1, elevation: 4 },
  name: { fontSize: 26, fontWeight: 'bold', textAlign: 'center' },
  studentId: { fontSize: 18, textAlign: 'center', marginTop: 4, letterSpacing: 0.5 },
  divider: { height: 1, marginVertical: 20 },
  details: { alignItems: 'center' },
  subtitle: { fontSize: 16, marginBottom: 4 },
  university: { fontSize: 18, fontWeight: '500', marginTop: 4 },
  sectionTitle: { fontSize: 20, fontWeight: '600', marginBottom: 16 },
  skillsContainer: { width: '100%', gap: 12 },
  skillBadge: { padding: 16, borderRadius: 12, borderWidth: 1 },
  skillText: { fontSize: 16, fontWeight: '500', marginBottom: 0 },
  courseCard: { margin: 16, padding: 24, borderRadius: 20, borderWidth: 1 },
  courseHeader: { fontSize: 16, fontWeight: '600', marginBottom: 8, letterSpacing: 1 },
  courseTitle: { fontSize: 20, fontWeight: '600', textAlign: 'center', lineHeight: 28 },
  description: { fontSize: 16, lineHeight: 24, opacity: 0.9 },
});

export default AboutScreen;