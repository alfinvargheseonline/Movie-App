import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const WatchProvidersPage = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjA3NGNiNTNmYzUyMTY0MWM1MzQ3OGQzZTczYzI4NSIsIm5iZiI6MTczNDU5MjM2Ni4yMjg5OTk5LCJzdWIiOiI2NzYzYzc2ZTYzODUzNjU5YmQ0YTQ4MTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ejag64COeITiFQRV5mWrHgmNh6SdHc3Tjhvwl_ry3vA";

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/watch/providers/movie?language=en-US",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );

        const data = await response.json();
        if (data.results) {
          setProviders(data.results);
        }
      } catch (error) {
        console.error("Error fetching watch providers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  const renderProvider = ({ item }) => (
    <View style={styles.providerCard}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w200${item.logo_path}`,
        }}
        style={styles.providerLogo}
      />
      <Text style={styles.providerName}>{item.provider_name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie Watch Providers</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" style={styles.loading} />
      ) : (
        <FlatList
          data={providers}
          keyExtractor={(item) => item.provider_id.toString()}
          renderItem={renderProvider}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    marginTop:30
  },
  loading: {
    marginTop: 20,
  },
  listContainer: {
    justifyContent: "space-between",
  },
  providerCard: {
    flex: 1,
    backgroundColor: "#222",
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
  },
  providerLogo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  providerName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default WatchProvidersPage;
