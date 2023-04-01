import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const router = createBrowserRouter([{ path: "/", element: <Home /> }]);
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
