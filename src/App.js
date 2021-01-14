import HomePage from "./pages/HomePage";
import BookDetailPage from "./pages/BookDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import ReadingPage from "./pages/ReadingPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PublicNavbar from "./components/PublicNavbar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <PublicNavbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/reading" component={ReadingPage} />
        <Route exact path="/books/:id" component={BookDetailPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
