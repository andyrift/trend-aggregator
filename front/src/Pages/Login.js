import GoogleButton from 'react-google-button';
import { Container } from 'react-bootstrap';

const Login = ({ authenticated, userData, isPendingUser, errorUser }) => {

  const handleClickGoogle = (e) => {
    window.location.replace('http://localhost:8000/api/v1/login/google');
  }

  return (
    <Container>
      <h2>Log in</h2>
      <GoogleButton className="mt-4" onClick={(e) => { handleClickGoogle(e) }}/>
    </Container>
  );
}
   
export default Login;
