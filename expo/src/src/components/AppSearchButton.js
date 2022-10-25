import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

export default function AppSearchButton() {
  const [term, setTerm] = useState();

  const handleSearchTerm = () => {
    console.log(term);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputContainer}
        placeholder="Jesus is..."
        placeholderTextColor="white"
        value={term}
        onChangeText={(text) => setTerm(text)}
      ></TextInput>
      <TouchableOpacity style={{ top: 20 }}>
        <Text>Button</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  inputContainer: {
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "black",
    color: "black",
  },
});
