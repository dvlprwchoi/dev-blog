import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <div className="header-title">
        <h1>DEV BLOG</h1>
      </div>
      {/* <div className="navbar"> */}
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/create">Create Post</Link>
      </nav>
      {/* </div> */}
    </div>
  );
}

export default Header;
