import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const TermsOfService = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Terms of Service</Text>
      <Text style={styles.paragraph}>
        By using Trackin Base, you agree to the following terms and conditions:
      </Text>
      <Text style={styles.subHeader}>Use of the App</Text>
      <Text style={styles.paragraph}>
        You are granted a non-exclusive, non-transferable license to access and use
        Trackin Base for personal, non-commercial use. You may not copy, modify, or distribute
        any part of the app without permission.
      </Text>
      <Text style={styles.subHeader}>User Responsibilities</Text>
      <Text style={styles.paragraph}>
        You are responsible for your use of Trackin Base and agree not to misuse the app.
        You agree not to upload, post, or transmit any content that is unlawful, harmful,
        or infringing on the rights of others.
      </Text>
      <Text style={styles.subHeader}>Limitation of Liability</Text>
      <Text style={styles.paragraph}>
        Trackin Base is provided "as is," and we do not guarantee the app will be free of
        errors or interruptions. We are not responsible for any damages resulting from
        the use of the app.
      </Text>
      <Text style={styles.subHeader}>Indemnity</Text>
      <Text style={styles.paragraph}>
        You agree to indemnify and hold harmless Trackin Base from any claims, damages, or
        expenses arising out of your use of the app.
      </Text>
      <Text style={styles.subHeader}>Changes to Terms of Service</Text>
      <Text style={styles.paragraph}>
        We may update these Terms of Service at any time. Updates will be posted here with
        the effective date.
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

export default TermsOfService;
