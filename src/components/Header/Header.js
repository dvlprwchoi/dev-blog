import { Link } from 'react-router-dom';

function Header({ isAuth, _logout }) {
  return (
    <div className="header">
      <div className="header-title">
        <h1>DEV BLOG</h1>
      </div>
      {/* <div className="navbar"> */}
      <nav className="navbar">
        <Link to="/">Home</Link>
        {!isAuth ? (
          <Link to="/login">Log In</Link>
        ) : (
          <button className="logout-button button" onClick={_logout}>
            Log Out
          </button>
        )}
        {isAuth && <Link to="/create">Create Post</Link>}
      </nav>
      {/* </div> */}
    </div>
  );
}

export default Header;
