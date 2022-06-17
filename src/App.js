import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./components/Home";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Footer from "./components/Footer";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Partener from "./components/Partener";
import Explore from "./components/ExploreMess"
import ResponsiveAppBarWithoutSearch from "./components/ResponsiveAppBarWithoutSearch";
import Logout from "./components/Logout";
import Mess from "./components/Mess";
import EditMenu from "./components/EditMenu";
import Blank from "./components/Blank";


function App() {
  const [role,setRole] = React.useState("");
  const [username,setUsername] = React.useState("");
  React.useEffect(()=>{
    setRole(localStorage.getItem("role"));
    setUsername(localStorage.getItem("username"));
  },[]);

if(role === "Owner"){
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={
          [
          <ResponsiveAppBarWithoutSearch/>,
          <Home />,
          <Footer/>
        ]
          
          }></Route>
          <Route exact path="/home" element={
             [
              <ResponsiveAppBarWithoutSearch/>,
              <Home />,
              <Footer/>
            ]
          }></Route>
          <Route exact path="/SignIn" element={
             [
              <ResponsiveAppBarWithoutSearch/>,
              <Signin />,
              <Footer/>
            ]
          }></Route>
          <Route exact path="/SignUp" element={
             [
              <ResponsiveAppBarWithoutSearch/>,
              <Signup />,
              <Footer/>
            ]
          }></Route>
          <Route exact path="/Partener" element={
             [
              <ResponsiveAppBarWithoutSearch/>,
              <Partener />,
              <Footer/>
            ]
          }></Route>
          <Route exact path="/Explore" element={
             [
              <ResponsiveAppBar/>,
              <Explore />,
              <Footer/>
            ]
          }></Route>
          <Route exact path="/Explore/:id" element={
             [
              <ResponsiveAppBarWithoutSearch/>,
              <Mess />,
              <Footer/>
            ]
          }></Route>
          <Route exact path="/EditMenu/:id" element={
             [
              <ResponsiveAppBarWithoutSearch/>,
              <EditMenu/>,
              <Footer/>
            ]
          }></Route>
          <Route exact path="/Logout" element={
            [
              <ResponsiveAppBarWithoutSearch/>,
              <Logout/>,
              <Footer/>
            ]
          }></Route>
      </Routes>
    </Router>
  );
}
else{
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={
          [
          <ResponsiveAppBarWithoutSearch/>,
          <Home />,
          <Footer/>
        ]
          
          }></Route>
          <Route exact path="/home" element={
             [
              <ResponsiveAppBarWithoutSearch/>,
              <Home />,
              <Footer/>
            ]
          }></Route>
          <Route exact path="/SignIn" element={
             [
              <ResponsiveAppBarWithoutSearch/>,
              <Signin />,
              <Footer/>
            ]
          }></Route>
          <Route exact path="/SignUp" element={
             [
              <ResponsiveAppBarWithoutSearch/>,
              <Signup />,
              <Footer/>
            ]
          }></Route>
          <Route exact path="/Partener" element={
             [
              <ResponsiveAppBarWithoutSearch/>,
              <Partener />,
              <Footer/>
            ]
          }></Route>
          <Route exact path="/Explore" element={
             [
              <ResponsiveAppBar/>,
              <Explore />,
              <Footer/>
            ]
          }></Route>
          <Route exact path="/Explore/:id" element={
             [
              <ResponsiveAppBarWithoutSearch/>,
              <Mess />,
              <Footer/>
            ]
          }></Route>
          <Route exact path="/EditMenu" element={
             [
              <ResponsiveAppBarWithoutSearch/>,
              <Blank/>,
              <Footer/>
            ]
          }></Route>
          <Route exact path="/Logout" element={
            [
              <ResponsiveAppBarWithoutSearch/>,
              <Logout/>,
              <Footer/>
            ]
          }></Route>
      </Routes>
    </Router>
  );
}

  
}

export default App;
