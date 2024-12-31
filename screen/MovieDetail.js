import React from "react";
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // For rating stars

const MovieDetail = ({ route }) => {
  const { item } = route.params; // Get the item passed from the Homepage

  // Function to render stars based on the vote average
  const renderStars = (rating) => {
    const filledStars = Math.round(rating / 2); // Out of 5 stars, as rating is out of 10
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
        {/* Backdrop Image */}
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
          }}
          style={styles.backdropImage}
        />
        
        {/* Movie Title */}
        <Text style={styles.title}>{item.title || item.name}</Text>

        {/* Movie Overview */}
        <Text style={styles.overview}>{item.overview}</Text>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <Text style={styles.vote}>Rating: </Text>
          <View style={styles.stars}>{renderStars(item.vote_average)}</View>
        </View>

        {/* Additional Details */}
        <Text style={styles.subheading}>Additional Details</Text>
        <Text style={styles.details}>
          Original Name: {item.original_name || "N/A"}
        </Text>
        <Text style={styles.details}>
          Media Type: {item.media_type || "N/A"}
        </Text>
        <Text style={styles.details}>
          Popularity: {item.popularity || "N/A"}
        </Text>
        <Text style={styles.details}>
          First Air Date: {item.first_air_date || item.release_date || "N/A"}
        </Text>
        <Text style={styles.details}>
          Vote Average: {item.vote_average || "N/A"}
        </Text>
        <Text style={styles.details}>
          Vote Count: {item.vote_count || "N/A"}
        </Text>

        {/* Release Date */}
        <Text style={styles.subheading}>Release Date</Text>
        <Text style={styles.releaseDate}>
          {item.first_air_date || item.release_date}
        </Text>

        {/* Genre(s) */}
        <Text style={styles.subheading}>Genre(s)</Text>
        <Text style={styles.genre}>
          {item.genre_ids.map((id, index) => (
            <Text key={id}>
              {index > 0 ? ", " : ""}
              {/* Placeholder for actual genre names */}
              {id} {/* You can map the genre IDs to names here */}
            </Text>
          ))}
        </Text>

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
    backgroundColor: "#000",
    padding: 10,
    marginTop:0
  },
  backdropImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  overview: {
    color: "#fff",
    fontSize: 16,
    marginVertical: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  vote: {
    color: "#fff",
    fontSize: 16,
    marginRight: 10,
  },
  stars: {
    flexDirection: "row",
  },
  subheading: {
    color: "#ffd700",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  releaseDate: {
    color: "#fff",
    fontSize: 14,
    marginTop: 10,
  },
  genre: {
    color: "#fff",
    fontSize: 14,
    marginTop: 10,
  },
  originCountry: {
    color: "#fff",
    fontSize: 14,
    marginTop: 10,
  },
  details: {
    color: "#fff",
    fontSize: 14,
    marginTop: 5,
  },
});

export default MovieDetail;