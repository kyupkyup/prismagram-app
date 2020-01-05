import React, { useState, useEffect } from "react";
import { Text, View, AsyncStorage, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { assertType } from "graphql";
import { persistCache } from "apollo-cache-persist";
import { InMemoryCache } from "apollo-cache-inmemory";
import styles from "./styles";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "react-apollo-hooks";
import ApolloClient from "apollo-boost";
import apolloClientOptions from "./apollo";
import NavController from "./Components/NavController";
import { AuthProvider } from "./AuthContext";


export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const preLoad = async () => {
    try {
      await Font.loadAsync({
        ...Ionicons.font
      });
      await Asset.loadAsync([require("./assets/icon.png")]);
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage
      });
      const client = new ApolloClient({
        cache,
        request: async(operation) =>{
          const token = await AsyncStorage.getItem("jwt");
          return operation.setContext({
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        },
        ...apolloClientOptions
      });
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if(!isLoggedIn || isLoggedIn === "false"){
        setIsLoggedIn(false);
      }
      else{
        setIsLoggedIn(true);
      }
      setLoaded(true);
      setClient(client);
    } catch (e) {

    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  return loaded && client && isLoggedIn !==null ?(
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <NavController />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
