import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Popular = () => {
  const [popularShows, setPopularShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPopularShows = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjA3NGNiNTNmYzUyMTY0MWM1MzQ3OGQzZTczYzI4NSIsIm5iZiI6MTczNDU5MjM2Ni4yMjg5OTk5LCJzdWIiOiI2NzYzYzc2ZTYzODUzNjU5YmQ0YTQ4MTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ejag64COeITiFQRV5mWrHgmNh6SdHc3Tjhvwl_ry3vA",
        },
      };

      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
          options
        );
        const data = await response.json();
        const sortedShows = data.results.sort(
          (a, b) => b.vote_average - a.vote_average
        );
        setPopularShows(sortedShows);
      } catch (err) {
        setError("Failed to fetch popular TV shows. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPopularShows();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading...</Text>
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
      <Text style={styles.header}>Popular TV Shows</Text>
      <FlatList
        data={popularShows}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("MovieDetail", { item })}
            style={styles.card}
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              style={styles.image}
            />
            <View style={styles.details}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.date}>Rating: {item.vote_average}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Popular;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    marginTop: 30,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loadingText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  errorText: {
    color: "#ff3d3d",
    fontSize: 16,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#1a1a1a",
    borderRadius: 5,
    overflow: "hidden",
  },
  image: {
    width: 100,
    height: 150,
  },
  details: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  date: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 5,
  },
});
