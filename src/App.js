import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Character";
import Error from "./pages/Error";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./style/global.scss";
import { FavoriteProvider } from "./context/FavoriteContext";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://swapi-graphql.netlify.app/.netlify/functions/index",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <FavoriteProvider>
        <Router>
          <div className="page-wrapper">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/character/:id" element={<Details />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </FavoriteProvider>
    </ApolloProvider>
  );
}

export default App;
