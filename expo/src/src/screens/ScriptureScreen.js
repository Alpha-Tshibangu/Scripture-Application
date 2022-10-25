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
import React from "react";
import { useState } from "react";
import AppSearchButton from "../components/AppSearchButton";

export default class ScriptureScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: { verse: "Loading..." },
      text: "",
    };
  }

  getJsonData = () => {
    fetch(
      "http://127.0.0.1:8000/kjv?" +
        new URLSearchParams({
          search_term: this.state.text,
        }),
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({ data: responseJson });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount = () => {
    this.getJsonData();
  };

  render() {
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
            {this.state.data["text"]}
          </Text>
          <Text style={[styles.secondaryText]} selectable={true}>
            {this.state.data["reference"]}
          </Text>
        </ScrollView>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.searchButtonContainer}
        >
          <TextInput
            style={styles.inputContainer}
            placeholder="Search"
            placeholderTextColor="white"
            // value={term}
            onChangeText={(text) => this.setState({ text })}
            onSubmitEditing={() => {
              console.log(this.state.text);
            }}
          ></TextInput>
        </KeyboardAvoidingView>
        <TouchableOpacity style={styles.buttonContainer}>
          <Button color="white" onPress={this.getJsonData} title="Scripture" />
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
