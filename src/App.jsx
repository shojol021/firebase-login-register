import './App.css'
import { getAuth, TwitterAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from './firebase/firebase.init'

function App() {
  const provider = new TwitterAuthProvider()
  const auth = getAuth(app)

  const handleTwitterLogin = () => {
    signInWithPopup(auth, provider)
    .then(res => {
      const user = res.user;
      console.log('User Info', user)
    })
    .catch(err => {
      console.log('err:', err)
    })
  }

  return (
    <div className="App">
      <h2>Twitter</h2>
      <button onClick={handleTwitterLogin}>Login with Twitter</button>        
    </div>
  )
}

export default App
