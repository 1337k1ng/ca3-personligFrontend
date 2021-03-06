import React, { useState, useEffect } from "react";
import facade from "./apiFacade";
import StarWars from "./starWars";
import WelcomePage from "./welcomePage";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Table from 'react-bootstrap/Table';

import { Switch, Route, NavLink } from "react-router-dom";

function Header({ loggedIn }) {
  return (
    <div>
      <ul className="header">
        <li>
          <NavLink exact activeClassName="selected" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="selected" to="/LoginPage">
            Login
          </NavLink>
        </li>
        {loggedIn && (
          <li>
            <NavLink activeClassName="selected" to="/StarwarsPage">
              Star Wars
            </NavLink>
          </li>
        )}
      <li>
          <NavLink activeClassName="selected" to="/userPage">
            User Page
            </NavLink>
      </li>



      </ul>
    </div>
  );
}

function StarWarsPage() {
  const emptyData = {
    planetInfo: [{ name: "Loading..." }],
    characterInfo: [{ name: "Loading..." }],
  };
  const [fetchedData, setfetchedData] = useState(emptyData);
  const [fetchedDataError, setfetchedDataError] = useState("");

  useEffect(() => {
    facade
      .fetchStarWarsData()
      .then((data) => setfetchedData(data))
      .catch((err) => err.fullError)
      .then((err) => setfetchedDataError(err));
  }, []);

  if (fetchedDataError) {
    return <h3>{fetchedDataError.message}</h3>;
  }
  return <StarWars fetchedData={fetchedData} />;
}






function Home() {
  return <WelcomePage />;
}

function LoginPage({ setLoggedIn, loggedIn }) {
  const [loggedInError, setLoggedInError] = useState("");

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };
  const login = (user, pass) => {
    facade
      .login(user, pass)
      .then((res) => setLoggedIn(true))
      .catch((err) => err.fullError)
      .then((data) => setLoggedInError(data));
  };

  if (loggedInError) {
    return (
      <div>
        <LogIn login={login} />
        <h3>{loggedInError.message}</h3>
      </div>
    );
  }

  return (
    <div>
      {!loggedIn ? (
        <LogIn login={login} />
      ) : (
        <div>
          <LoggedIn />
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}


function UserPage() {
 // Const er en form for hook. Den laver en variabel som kan arbejde med resultatet efter rendering. 
  const [fetchData, setFetchData] = useState([]);
 

  useEffect(() => {
    facade.fetchUserPageData().then((data) => setFetchData(data)); 
    //Tomt array betyder at den kun renderes én gang, og kun en gang. 
  }, []);

  return (
    <Table striped bordered hover>
<thead>
  <tr>
    <th>Firstname</th>
    <th>Name</th>
    <th>Age</th>
    <th>Weight</th>
  </tr>
  </thead>
<tbody>
{MapUsers(fetchData)}
</tbody>
</Table>

  )


function MapUsers(fetchData){
return fetchData.map((data) => {


  return(
  <tr>
   <td>{data.userName}</td>
   <td>{data.userInfo.name}</td> 
   <td>{data.userInfo.age}</td> 
   <td>{data.userInfo.weight}</td> 
  </tr>
 )
})



}




}


function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onChange={onChange}>
        <input placeholder="User Name" id="username" />
        <input type="password" placeholder="Password" id="password" />
        <button onClick={performLogin}>Login</button>
      </form>
    </div>
  );
}
function LoggedIn() {
  const [dataFromServer, setDataFromServer] = useState("");
  const jwt = require("jsonwebtoken");
  const token = localStorage.getItem("jwtToken");
  const role = jwt.decode(token).roles;

  let roleToFetch = role;
  if (roleToFetch === "admin,user") {
    roleToFetch = "admin";
  }
  useEffect(() => {
    facade.fetchData(roleToFetch).then((data) => setDataFromServer(data.msg));
  }, []);

  return (
    <div>
      <h2>Data Received from server</h2>
      <h3>{dataFromServer}</h3>
      <h3>Role: {role}</h3>
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <Header loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/LoginPage">
          <LoginPage setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
        </Route>

        <Route exact path="/StarWarsPage">
          <StarWarsPage />
        </Route>
        <Route exact path="/userPage">
          <UserPage/>
        </Route>

    
      </Switch>
    </div>
  );
}
export default App;
