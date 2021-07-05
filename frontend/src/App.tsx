import React from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

import { InMemoryCache, ApolloProvider, ApolloClient } from "@apollo/client";
import Products from "./Products";
import ProductDetail from "./ProductDetail";

// client オブジェクトの作成
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4010/graphql"
});

function App() {
  // 全体を ApolloProvider でラップする
  return (
    <ApolloProvider client={client}>
      <HashRouter>
      <Switch>
        <Route path="/products" exact>
          <Products />
        </Route>
        <Route path="/products/:productId">
          <ProductDetail />
        </Route>
        <Route>
          <Redirect to="/products" />
        </Route>
      </Switch>
    </HashRouter>
    </ApolloProvider>
  );
}

export default App;
