import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ApolloProvider } from "@apollo/client";
import { ConfigProvider } from "antd";
import { client } from "./app/apollo";
import { AppRouting } from "./app/routing";
import { FirebaseLoginService } from "./firebase";
import { firebaseConfig } from "./firebase/firebaseConfig";

function App() {
  new FirebaseLoginService().initialize(firebaseConfig);

  return (
    <ConfigProvider>
      <ApolloProvider client={client}>
        <AppRouting />
      </ApolloProvider>
    </ConfigProvider>
  );
}

export default App;
