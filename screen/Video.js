import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import { WebView } from 'react-native-webview';

const Video = () => {
  const [video, setVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [seriesId, setSeriesId] = useState(null); // Track Series ID for video fetching

  const { width, height } = Dimensions.get('window'); 

  // Updated fetch function to get videos based on the TV series ID
  const fetchVideoData = (query) => {
    setLoading(true);

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer YOUR_API_KEY', // Replace with your API key
      },
    };

    // Here you would use the seriesId for fetching videos
    fetch(`https://api.themoviedb.org/3/tv/${seriesId}/videos?language=en-US`, options)
      .then((res) => res.json())
      .then((res) => {
        if (res.results && res.results.length > 0) {
          setSearchResults(res.results);
        } else {
          alert('No videos found');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (seriesId) {
      fetchVideoData();
    }
  }, [seriesId]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Assuming the TV series ID is retrieved from the search query or user input
      const seriesIdFromSearch = searchQuery; // Replace this with actual logic for getting series ID based on search
      setSeriesId(seriesIdFromSearch); // Set the series ID to fetch videos
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Video Search</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter TV Series ID"
          placeholderTextColor="#ccc"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>

      {/* Featured Video or Selected Video */}
      {video && (
        <View style={styles.selectedVideoContainer}>
          <Text style={styles.videoTitle}>{video.title || video.name}</Text>
          <Text style={styles.videoDetails}>Type: {video.media_type}</Text>
          <Text style={styles.videoDetails}>
            Published At: {new Date(video.release_date).toLocaleDateString()}
          </Text>

          <WebView
            source={{
              uri: `https://www.youtube.com/embed/${video.key}`,
            }}
            style={styles.webView(width, height)}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        </View>
      )}

      {/* Search Results - List of Videos */}
      <ScrollView contentContainerStyle={styles.resultsContainer}>
        {searchResults.length > 0 ? (
          searchResults.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => setVideo(item)}>
              <View style={styles.resultItem}>
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
                  style={styles.resultImage}
                />
                <Text style={styles.resultTitle}>{item.title || item.name}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noResultsText}>No results found</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    backgroundColor: '#222',
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  searchContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    color: '#fff',
    width: '80%',
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  selectedVideoContainer: {
    marginBottom: 30,
  },
  videoTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  videoDetails: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  webView: (width, height) => ({
    width: width * 0.9,
    height: height * 0.4, // Set a rectangular size for the video player
    borderRadius: 10,
    marginTop: 10,
  }),
  resultsContainer: {
    paddingBottom: 20,
  },
  resultItem: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  resultImage: {
    width: 100,
    height: 150,
    borderRadius: 5,
    marginRight: 10,
  },
  resultTitle: {
    color: '#fff',
    fontSize: 18,
    flex: 1,
  },
  noResultsText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
});

export default Video;
