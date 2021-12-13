import React, { useState } from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
  // URI stands for "Uniform Resource Identifier."
  uri: "/graphql", //for this to work er also need to
  //open the package.json file in the client directory. Once that's open, add one more key-value pair towards the top of the JSON object "proxy": "http://localhost:3001", check line 1 on the client side json file.
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
