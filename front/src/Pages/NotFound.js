import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const NotFound = ({ authenticated, userData, isPendingUser, errorUser }) => {
  return (  
    <Container>
      <h2 className="mt-4">Sorry</h2>
      <p className="mt-2">This page could not be found</p>
      <Link to='/'>Back to homepage...</Link>
    </Container>
  );
}
 
export default NotFound;