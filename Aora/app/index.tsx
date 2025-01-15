import Main, { home } from "../styles/index";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function App(): JSX.Element {
  return (
    <View style={Main.container}>
      <StatusBar style="dark" />
      <Text style={home.title}>Aora</Text>
      <Link href="/(tabs)/Profile">Profile</Link>
    </View>
  );
}