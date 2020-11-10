import React, { useState,useEffect } from "react"
import facade from "./apiFacade";
import {
  Switch,
  Route,
  Link,
  NavLink,
  useRouteMatch,
  Prompt
} from "react-router-dom";




function Header(){
  return (
    <div>
      <ul className="header">
            <li>
            <NavLink exact activeClassName="selected" to="/">Home</NavLink>
            </li>
            <li>
            <NavLink  activeClassName="selected" to="/LoginPage">Login</NavLink>
            </li>
            
    </ul>
   </div>
  )  
  }
  
  function Home(){
    return (
      <div>
        <h1>This is the Welcome Page</h1>
      </div>
    )
  } 



  function LoginPage(){
    const [loggedIn, setLoggedIn] = useState(false)   
    const [loggedInError, setLoggedInError] = useState("")
 
    const logout = () => { facade.logout()
      setLoggedIn(false) } 
    const login = (user, pass) => { facade.login(user,pass)
      .then(res =>setLoggedIn(true)).catch(err => err.fullError).then(data => setLoggedInError(data));} 
   
    
if(loggedInError){
  return (
    <div>
    <LogIn login={login} />
  <h3>{loggedInError.message}</h3>
  </div>
    )
  }

    return (
      <div>
      {!loggedIn ? (<LogIn login={login} />) :
        (<div>
          <LoggedIn />
          <button onClick={logout}>Logout</button>
        </div>)}
</div>
    )}
   

function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
 
  
  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  }
  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials,[evt.target.id]: evt.target.value })
  }
 
  return (
    <div>
      <h2>Login</h2>
      <form onChange={onChange} >
        <input placeholder="User Name" id="username" />
        <input type="password" placeholder="Password" id="password" />
        <button onClick={performLogin}>Login</button>
      </form>
    </div>
  )
 
}
function LoggedIn() {
  const [dataFromServer, setDataFromServer] = useState("")
  const [errorFromServer, setErrorFromServer] = useState("")
  
  useEffect(() => { facade.fetchData().then(data=> setDataFromServer(data.msg)) 
    .catch(err  => err.fullError ).then(facade.fetchDataAdmin().then(data=> setErrorFromServer(data.msg))) 
    ;       }, [])
  


if(errorFromServer !== ""){
  console.log(errorFromServer)
  return(
    <div>
  <h3>{errorFromServer}</h3>
  <h3>Role:Admin</h3>
  </div>
  
  )
}


  return (
    <div>
      <h2>Data Received from server</h2>
      <h3>{dataFromServer}</h3>
      <h3>Role: User</h3>
    </div>
  )
 
}
 
function App() { 
  return (
  
    <div>
        <Header/>
        <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route exact path="/LoginPage">
      <LoginPage />
    </Route>
    </Switch> 
    </div>
  )
 
}
export default App;
