import { StyleSheet } from "react-native";

export { default as home } from "./home";
export { default as tabs } from "./tabs";
export { fonts } from "./fonts";

const main = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    color: "#000",
  }
})

export default main