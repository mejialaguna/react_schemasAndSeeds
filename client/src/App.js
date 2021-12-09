import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { ApolloClient } from 'apollo-client';
import { setContext } from "@apollo/client/link/context";
import "bootstrap/dist/css/bootstrap.min.css";
import NoMatch from "./components/NoMatch";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import About from "./components/About";
import Main from "./components/Main"
import ProductContext from "./utils/productContext";
import Login from "./components/Sign/SignIn"
import SignUp from "./components/Sign/SignupForm";



const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



function App() {

  const [products , setProducts] = useState([])
  return (
    // <div style={{ minHeight: "100vh", position: "relative" }}>
    <ApolloProvider client={client}>
      <ProductContext.Provider value={products}>
        <Router>
          <SideBar setProducts={setProducts} />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/" component={SideBar} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route path="/about" exact component={About} />
            <Route component={NoMatch} />
          </Switch>

          <Footer />
        </Router>
      </ProductContext.Provider>
    </ApolloProvider>
    // </div>
  );
}

export default App;
