import './App.css';
import app from './firebase.init';
import { getAuth, GithubAuthProvider,  GoogleAuthProvider,  signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';

const auth = getAuth(app);


function App() {
  const [user, setUser] = useState({})
  
const googleProvider = new GoogleAuthProvider();
const githubprovider = new GithubAuthProvider();


  const handleGoogleSign = () =>{
    signInWithPopup(auth, googleProvider)
    .then(result =>{
      const user = result.user;
      setUser(user)
      console.log(user);
    })
    .catch(Error =>{
      console.log(Error);
    })
  }


  const handelGithubSignIn = () =>{
    signInWithPopup(auth, githubprovider)
    .then(result =>{
      const user = result.user;
      setUser(user);
      console.log(user);
     
    })
    .catch(Error =>{
      console.log('error')
    })
  }

const handelSignOut = () =>{
  signOut(auth)
  .then( () =>{
    setUser({});
  })
  .catch(Error => {
    setUser({});
  })

}

  return (
    <div className="App">
      {
        user.uid ? <button onClick={handelSignOut}>sign out</button>
        :
        <>
           <button onClick={handleGoogleSign}>google sign in</button>   
          <button onClick={handelGithubSignIn}>github sign in</button>    
        </>
      }

    <h2>your name:{user.displayName}</h2>
    <p>I know your email address: {user.email}</p>
    <img src={user.photoURL} alt=""></img>
   </div>
  );
}

export default App;
