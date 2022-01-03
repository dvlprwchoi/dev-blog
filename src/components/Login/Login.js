import { auth, provider } from '../../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ setIsAuth }) {
  let navigate = useNavigate();

  const _signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem('isAuth', true);
      setIsAuth(true);
      navigate('/');
    });
  };
  return (
    <div className="login main">
      {/* <p>Sign in with Google to continue</p> */}
      <button
        className="login-with-google-btn button"
        onClick={_signInWithGoogle}
      >
        {' '}
        Sign In with Google
      </button>
    </div>
  );
}

export default Login;
