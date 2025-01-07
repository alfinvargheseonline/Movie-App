import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const Trailer = () => {
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrailers = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjA3NGNiNTNmYzUyMTY0MWM1MzQ3OGQzZTczYzI4NSIsIm5iZiI6MTczNDU5MjM2Ni4yMjg5OTk5LCJzdWIiOiI2NzYzYzc2ZTYzODUzNjU5YmQ0YTQ4MTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ejag64COeITiFQRV5mWrHgmNh6SdHc3Tjhvwl_ry3vA'
        }
      };

      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/movie_id/videos?language=en-US', options);
        const data = await response.json();
        setTrailers(data.results || []); // Assuming `results` contains the trailer data
      } catch (error) {
        console.error('Error fetching trailer data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailers();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {trailers.length > 0 ? (
        trailers.map((trailer, index) => (
          <Text key={index} style={styles.text}>
            {trailer.name} ({trailer.type})
          </Text>
        ))
      ) : (
        <Text style={styles.text}>No trailers available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 16,
    marginBottom: 10
  }
});

export default Trailer;
