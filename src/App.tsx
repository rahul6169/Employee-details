import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ApolloProvider } from "@apollo/client";
import { ConfigProvider } from "antd";
import { client } from "./app/apollo";
import { AppRouting } from "./app/routing";

function App() {
  return (
    <ConfigProvider theme={{ hashed: false }}>
      <ApolloProvider client={client}>
        <AppRouting />
      </ApolloProvider>
    </ConfigProvider>
  );
}

export default App;
