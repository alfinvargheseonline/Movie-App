import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const About = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>About Trackin Base</Text>
      <Text style={styles.paragraph}>
        Trackin Base is an innovative mobile application designed to help users
        track their favorite movies and access the latest movie trailers with ease.
        With a user-friendly interface and a seamless experience, Trackin Base ensures
        that you never miss the latest movie buzz. Whether you're a casual moviegoer or
        a dedicated cinephile, Trackin Base is your go-to app for movie entertainment.
      </Text>
      <Text style={styles.paragraph}>
        Our mission is to provide movie enthusiasts with the most accurate and up-to-date
        movie information. We aim to create an engaging platform where users can explore
        trailers, stay informed on the latest releases, and track their movie-watching habits.
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
  paragraph: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
    marginBottom: 16,
  },
});

export default About;
