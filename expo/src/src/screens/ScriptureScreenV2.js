import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  TextInput,
} from "react-native";
import {
  useFonts,
  DMSerifDisplay_400Regular,
  DMSerifDisplay_400Regular_Italic,
} from "@expo-google-fonts/dm-serif-display";
import { React, useState } from "react";
import AppLoading from "expo-app-loading";
import { Foundation } from "@expo/vector-icons";

export default function ScriptureScreenV2() {
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState("");
  const url = "http://127.0.0.1:8000/kjv?search_term=God";

  let [fontsLoaded] = useFonts({
    DMSerifDisplay_400Regular,
    DMSerifDisplay_400Regular_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.ScrollViewContainer}
          contentContainerStyle={{
            flexGrow: 0.5,
            width: "100%",
          }}
        >
          <Text style={styles.mainText} selectable={true}>
            Eventual verse text requested from Server.
          </Text>
          <Text style={[styles.secondaryText]} selectable={true}>
            Verse references.
          </Text>
        </ScrollView>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.searchButtonContainer}
        >
          <TextInput
            style={styles.inputContainer}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder="Search"
            placeholderTextColor="white"
          ></TextInput>
        </KeyboardAvoidingView>
        <View
          style={{
            // backgroundColor: "green",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingVertical: 5,
            left: 5,
            bottom: 745,
            flexWrap: "wrap",
            width: "20%",
          }}
        >
          <TextInput
            style={[styles.inputContainer, { width: "85%", padding: 10 }]}
            onChangeText={(text) => setLanguage(text)}
            onSubmitEditing={function handleLanguage() {
              console.log(language);
            }}
            placeholder="English"
            placeholderTextColor="white"
          ></TextInput>
        </View>

        <View
          style={{
            // backgroundColor: "green",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingVertical: 5,
            bottom: 784,
            left: 85,
          }}
        >
          <TouchableOpacity
            style={[styles.inputContainer, { backgroundColor: "white" }]}
          >
            <Foundation name="sound" size={18} color="#002f56" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonContainer}>
          <Button
            color="white"
            title="Scripture"
            onPress={function handleClick() {
              console.log(searchTerm);
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#002f56",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: StatusBar.currentHeight,
    flex: 1,
  },
  buttonContainer: {
    width: "100%",
    bottom: 160,
    position: "absolute",
  },
  mainText: {
    top: 100,
    color: "white",
    margin: 25,
    fontSize: 30,
    fontFamily: "DMSerifDisplay_400Regular",
  },
  secondaryText: {
    top: 100,
    marginLeft: 25,
    color: "white",
    fontSize: 22,
    fontFamily: "DMSerifDisplay_400Regular_Italic",
  },
  searchButtonContainer: {
    top: "73%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  ScrollViewContainer: {
    //backgroundColor: "pink",
    width: "100%",
    marginBottom: 260,
  },
  inputContainer: {
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "white",
    color: "white",
  },
});
