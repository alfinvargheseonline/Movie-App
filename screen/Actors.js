import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';

const Actors = () => {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  const fetchActors = (searchQuery) => {
    setLoading(true);
    setError(null);
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjA3NGNiNTNmYzUyMTY0MWM1MzQ3OGQzZTczYzI4NSIsIm5iZiI6MTczNDU5MjM2Ni4yMjg5OTk5LCJzdWIiOiI2NzYzYzc2ZTYzODUzNjU5YmQ0YTQ4MTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ejag64COeITiFQRV5mWrHgmNh6SdHc3Tjhvwl_ry3vA',
      },
    };

    fetch(`https://api.themoviedb.org/3/search/person?include_adult=false&language=en-US&page=1&query=${searchQuery}`, options)
      .then((res) => res.json())
      .then((data) => {
        setActors(data.results || []);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch actors. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    // Fetch default actors (optional)
    fetchActors('p'); // Example default query
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      fetchActors(query);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading Actors...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Actors</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for actors..."
          placeholderTextColor="#ccc"
          value={query}
          onChangeText={(text) => setQuery(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={actors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{
                uri: item.profile_path
                  ? `https://image.tmdb.org/t/p/w200${item.profile_path}`
                  : 'https://via.placeholder.com/200',
              }}
              style={styles.image}
            />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              {item.known_for && (
                <Text style={styles.knownFor}>
                  Known for: {item.known_for.map((movie) => movie.title || movie.name).join(', ')}
                </Text>
              )}
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.noResults}>No results found.</Text>}
      />
    </View>
  );
};

export default Actors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    color: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: '#ff5722',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  errorText: {
    color: '#ff3d3d',
    fontSize: 16,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#1a1a1a',
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 150,
  },
  details: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  knownFor: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 5,
  },
  noResults: {
    textAlign: 'center',
    color: '#ccc',
    marginTop: 20,
  },
});
