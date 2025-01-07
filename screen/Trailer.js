import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview'; // Import WebView

const Trailer = () => {
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Your actual API Key here
  const apiKey = '5b074cb53fc521641c53478d3e73c285'; // Replace with your API key

  useEffect(() => {
    const fetchLatestMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
        );

        const data = await response.json();
        console.log('Fetched Data:', data); // Log the response to check if data is fetched

        if (data.results) {
          // Fetch trailer details for each movie
          const trailerPromises = data.results.map(async (movie) => {
            const trailerResponse = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}&language=en-US`
            );
            const trailerData = await trailerResponse.json();
            return {
              title: movie.title,
              trailerKey: trailerData.results[0]?.key, // Get the first trailer key
            };
          });

          const trailersData = await Promise.all(trailerPromises);
          setTrailers(trailersData);
        } else {
          console.error('No results found in the API response');
        }
      } catch (error) {
        console.error('Error fetching movie data:', error); // Catch and log any errors
      } finally {
        setLoading(false);
      }
    };

    fetchLatestMovies();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.header}>Latest Movie Trailers</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : (
            trailers.length > 0 ? (
              trailers.map((trailer, index) => (
                <View key={index} style={styles.movieContainer}>
                  <Text style={styles.movieTitle}>{trailer.title}</Text>
                  {trailer.trailerKey ? (
                    <WebView
                      style={styles.webview}
                      source={{ uri: `https://www.youtube.com/embed/${trailer.trailerKey}` }}
                      javaScriptEnabled={true}
                      domStorageEnabled={true}
                    />
                  ) : (
                    <Text style={styles.noTrailerText}>No trailer available</Text>
                  )}
                </View>
              ))
            ) : (
              <Text style={styles.noTrailerText}>No trailers available.</Text>
            )
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414', // Dark background like Netflix
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff', // White text
  },
  movieContainer: {
    marginBottom: 30,
    backgroundColor: '#333', // Dark card background
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Add shadow for Android
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff', // White text
    marginBottom: 10,
  },
  webview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
  },
  noTrailerText: {
    fontSize: 16,
    color: '#fff', // White text for empty state
    textAlign: 'center',
  },
});

export default Trailer;
