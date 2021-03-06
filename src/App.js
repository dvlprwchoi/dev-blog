import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Create from './components/Create/Create';
import Footer from './components/Footer/Footer';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import Edit from './components/Edit/Edit';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  const _logout = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = '/';
    });
  };

  const [isDark, setIsDark] = useState(false);

  const _changeTheme = () => {
    // console.log('theme');
    setIsDark(isDark ? false : true);
  };
  // console.log(isDark);

  return (
    <div className="App" theme={isDark ? 'a' : 'b'}>
      <Router>
        <Header
          isAuth={isAuth}
          _logout={_logout}
          _changeTheme={_changeTheme}
          isDark={isDark}
        />
        <Routes>
          <Route exact path="/" element={<Home isAuth={isAuth} />} />
          <Route
            exact
            path="/login"
            element={<Login setIsAuth={setIsAuth} />}
          />
          <Route exact path="/create" element={<Create isAuth={isAuth} />} />
          <Route exact path="/edit/:id" element={<Edit isAuth={isAuth} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
