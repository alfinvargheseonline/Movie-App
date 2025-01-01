import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

function Homepage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false); // For search loading
  const [error, setError] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjA3NGNiNTNmYzUyMTY0MWM1MzQ3OGQzZTczYzI4NSIsIm5iZiI6MTczNDU5MjM2Ni4yMjg5OTk5LCJzdWIiOiI2NzYzYzc2ZTYzODUzNjU5YmQ0YTQ4MTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ejag64COeITiFQRV5mWrHgmNh6SdHc3Tjhvwl_ry3vA",
          },
        };

        // Fetch Trending Movies
        const trendingResponse = await fetch(
          "https://api.themoviedb.org/3/trending/all/day?language=en-US",
          options
        );
        const trendingData = await trendingResponse.json();
        setTrendingMovies(trendingData.results);
        setFilteredMovies(trendingData.results);

        // Fetch Top Rated Movies
        const topRatedResponse = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
          options
        );
        const topRatedData = await topRatedResponse.json();
        setTopRatedMovies(topRatedData.results);

        // Fetch Action Movies
        const actionResponse = await fetch(
          "https://api.themoviedb.org/3/discover/movie?with_genres=28&language=en-US&page=1",
          options
        );
        const actionData = await actionResponse.json();
        setActionMovies(actionData.results);
      } catch (err) {
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = async (text) => {
    setSearchText(text);
    if (text === "") {
      setFilteredMovies(trendingMovies); // Reset filtered movies if the search text is empty
    } else {
      setSearchLoading(true); // Set search loading state
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjA3NGNiNTNmYzUyMTY0MWM1MzQ3OGQzZTczYzI4NSIsIm5iZiI6MTczNDU5MjM2Ni4yMjg5OTk5LCJzdWIiOiI2NzYzYzc2ZTYzODUzNjU5YmQ0YTQ4MTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ejag64COeITiFQRV5mWrHgmNh6SdHc3Tjhvwl_ry3vA",
          },
        };
        const searchResponse = await fetch(
          `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${text}`,
          options
        );
        const searchData = await searchResponse.json();
        setFilteredMovies(searchData.results);
      } catch (err) {
        setError("Failed to load search results. Please try again later.");
      } finally {
        setSearchLoading(false); // Set search loading state to false once the request is completed
      }
    }
  };

  const renderCategory = (title, data) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{title}</Text>
      <FlatList
        horizontal
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("MovieDetail", { item })}
            style={styles.item}
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              style={styles.image}
            />
            <Text style={styles.title}>{item.title || item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  const toggleMenu = () => setMenuVisible(!menuVisible);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading Movies...</Text>
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
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView>
        {/* App Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
            <Icon name="menu" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Trackin Base</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon
            name="search"
            size={20}
            color="#fff"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search movies..."
            placeholderTextColor="#aaa"
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>

        {searchLoading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <>
            {/* Movie Categories */}
            {renderCategory("Trending Now", filteredMovies)}
            {renderCategory("Top Rated", topRatedMovies)}
            {renderCategory("Action Movies", actionMovies)}
          </>
        )}

        {/* Menu Modal */}
<Modal
  transparent
  visible={menuVisible}
  animationType="slide"
  onRequestClose={toggleMenu}
>
  <TouchableWithoutFeedback onPress={toggleMenu}>
    <View style={styles.overlay}>
      <TouchableWithoutFeedback>
        <View style={styles.sideMenuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              toggleMenu();
              navigation.navigate("AiringToday");
            }}
          >
            <Text style={styles.menuText}>Airing Today</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              toggleMenu();
              navigation.navigate("OnTheAir");
            }}
          >
            <Text style={styles.menuText}>On The Air</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              toggleMenu();
              navigation.navigate("Popular");
            }}
          >
            <Text style={styles.menuText}>Popular</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              toggleMenu();
              navigation.navigate("Actors");
            }}
          >
            <Text style={styles.menuText}>Actors</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              toggleMenu();
              navigation.navigate("Video");
            }}
          >
            <Text style={styles.menuText}>Video</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </View>
  </TouchableWithoutFeedback>
</Modal>

      </ScrollView>
    </SafeAreaView>
  );
}

export default Homepage;

// Updated Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    backgroundColor: "#1a1a1a",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 10,
  },
  menuButton: {
    marginRight: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 10,
  },
  item: {
    marginRight: 10,
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 5,
  },
  title: {
    marginTop: 5,
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start", // Change this to align items for side menu
    flexDirection: "row",
  },
  sideMenuContainer: {
    width: "70%", // Adjust the width for the side menu
    backgroundColor: "#1a1a1a",
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  menuItem: {
    marginVertical: 10,
  },
  menuText: {
    fontSize: 18,
    color: "#fff",
  },
});
