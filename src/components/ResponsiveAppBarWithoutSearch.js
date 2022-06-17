import * as React from "react";
import SearchIcon from '@mui/icons-material/Search';

const ResponsiveAppBar = () => {
  const user = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  return (
    <>
      <div className="Navbar">
        <div className="Nav-logo">
          Mess Locator
        </div>
        {/* <div className="Seachbar">
            <input type="text" name="search" placeholder="Enter the college name"></input>
            <SearchIcon style={{"position":"absolute","color":"rgb(198, 0, 194)","height":"50px","width":"50px","marginLeft":"-60px"}}/>
        </div> */}
        <div className="Nav-headings">
          <a href="/home">Home</a>
          <a href="/Explore">Explore</a>
          {role=="Owner"?<span><a href={`/EditMenu/${user}`}>Edit Menu</a></span>:<a href="/Partener">Become our partener</a>}
          {user?<span></span>:<a href="/SignIn">Sign In</a>}
          {user?<a href="/Logout">Logout</a>:<a href="/SignUp">Sign Up</a>}
        </div>
      </div>
    </>
  )


}

export default ResponsiveAppBar;