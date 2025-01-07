import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PrivacyPolicy = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Privacy Policy</Text>
      <Text style={styles.paragraph}>
        At Trackin Base, we respect and protect your privacy. This Privacy Policy explains
        how we collect, use, and disclose your information when you use our app.
      </Text>
      <Text style={styles.subHeader}>Information Collection</Text>
      <Text style={styles.paragraph}>
        We do not collect personally identifiable information unless you voluntarily provide
        it through account creation or other interactions. We may collect non-personal
        information such as device type, OS version, and usage patterns to improve the app.
      </Text>
      <Text style={styles.subHeader}>Data Usage</Text>
      <Text style={styles.paragraph}>
        Your data is used to enhance your experience, personalize content, and improve app
        performance. We do not sell or rent your personal data to third parties.
      </Text>
      <Text style={styles.subHeader}>Cookies</Text>
      <Text style={styles.paragraph}>
        Trackin Base may use cookies to store preferences, analyze app performance, and
        provide personalized content.
      </Text>
      <Text style={styles.subHeader}>Security</Text>
      <Text style={styles.paragraph}>
        We implement reasonable security measures to protect your data. However, no data
        transmission over the internet is completely secure, and we cannot guarantee 100%
        security.
      </Text>
      <Text style={styles.subHeader}>Changes to Privacy Policy</Text>
      <Text style={styles.paragraph}>
        We may update this Privacy Policy from time to time. Any changes will be posted
        on this page with the updated date.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    padding: 16,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
  },
  paragraph: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
    marginBottom: 16,
  },
});

export default PrivacyPolicy;
