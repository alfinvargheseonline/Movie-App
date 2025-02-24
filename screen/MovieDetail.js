import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // For overlay effect
import { MaterialCommunityIcons } from "@expo/vector-icons"; // For rating stars
import { WebView } from "react-native-webview"; // Import WebView

const MovieDetail = ({ route }) => {
  const { item } = route.params;
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiKey = '5b074cb53fc521641c53478d3e73c285'; // Replace with your actual API key

  // Fetch the trailer for the selected movie or TV show
  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${apiKey}&language=en-US`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setTrailerKey(data.results[0].key); // Set the first trailer key
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      } finally {
        setLoading(false);
      }
    };

    if (item.id) {
      fetchTrailer();
    }
  }, [item.id]);

  const renderStars = (rating) => {
    const filledStars = Math.round(rating / 2);
    const totalStars = 5;
    const stars = [];

    for (let i = 0; i < totalStars; i++) {
      if (i < filledStars) {
        stars.push(
          <MaterialCommunityIcons key={i} name="star" size={24} color="#ffd700" />
        );
      } else {
        stars.push(
          <MaterialCommunityIcons key={i} name="star-outline" size={24} color="#ffd700" />
        );
      }
    }

    return stars;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Backdrop Image with Gradient Overlay */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
            }}
            style={styles.backdropImage}
          />
          <LinearGradient
            colors={["rgba(0,0,0,0.6)", "transparent"]}
            style={styles.gradient}
          />
        </View>

        {/* Movie Title */}
        <Text style={styles.title}>{item.title || item.name}</Text>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <Text style={styles.vote}>Rating:</Text>
          <View style={styles.stars}>{renderStars(item.vote_average)}</View>
        </View>

        {/* Movie Overview */}
        <Text style={styles.subheading}>Overview</Text>
        <Text style={styles.overview}>{item.overview || "No overview available."}</Text>

        {/* Trailer */}
        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : trailerKey ? (
          <SafeAreaView style={styles.trailerContainer}>
            <Text style={styles.subheading}>Trailer</Text>
            <WebView
              style={styles.webview}
              source={{ uri: `https://www.youtube.com/embed/${trailerKey}` }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
            />
          </SafeAreaView>
        ) : (
          <Text style={styles.noTrailerText}>No trailer available</Text>
        )}

        {/* Additional Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.details}>
            <Text style={styles.detailsLabel}>Original Name: </Text>
            {item.original_name || "N/A"}
          </Text>
          <Text style={styles.details}>
            <Text style={styles.detailsLabel}>Media Type: </Text>
            {item.media_type || "N/A"}
          </Text>
          <Text style={styles.details}>
            <Text style={styles.detailsLabel}>Popularity: </Text>
            {item.popularity || "N/A"}
          </Text>
          <Text style={styles.details}>
            <Text style={styles.detailsLabel}>Release Date: </Text>
            {item.first_air_date || item.release_date || "N/A"}
          </Text>
          <Text style={styles.details}>
            <Text style={styles.detailsLabel}>Vote Average: </Text>
            {item.vote_average || "N/A"}
          </Text>
          <Text style={styles.details}>
            <Text style={styles.detailsLabel}>Vote Count: </Text>
            {item.vote_count || "N/A"}
          </Text>
        </View>

        {/* Genres */}
        <Text style={styles.subheading}>Genre(s)</Text>
        <View style={styles.badges}>
          {item.genre_ids.map((id) => (
            <View key={id} style={styles.badge}>
              <Text style={styles.badgeText}>{id}</Text>
            </View>
          ))}
        </View>

        {/* Origin Country */}
        <Text style={styles.subheading}>Origin Country</Text>
        <Text style={styles.originCountry}>
          {Array.isArray(item.origin_country) && item.origin_country.length > 0
            ? item.origin_country.join(", ")
            : "N/A"}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 10,
  },
  imageContainer: {
    position: "relative",
  },
  backdropImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginTop: 30,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    borderRadius: 10,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  vote: {
    color: "#fff",
    fontSize: 18,
    marginRight: 10,
  },
  stars: {
    flexDirection: "row",
  },
  subheading: {
    color: "#ffd700",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  overview: {
    color: "#ddd",
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
  },
  trailerContainer: {
    marginBottom: 20,
  },
  webview: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    overflow: "hidden",
  },
  noTrailerText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  detailsContainer: {
    marginVertical: 20,
  },
  details: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
  detailsLabel: {
    fontWeight: "bold",
    color: "#ffd700",
  },
  badges: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  badge: {
    backgroundColor: "#333",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  badgeText: {
    color: "#fff",
    fontSize: 14,
  },
  originCountry: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },
});

export default MovieDetail;
