import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const LoginFailure = ({ authenticated, userData, isPendingUser, errorUser }) => {
  const history = useHistory();
  useEffect(() => {    
    setTimeout(() => {
      history.push("/profile");
    }, 1000)
  }, [history])

  return (
    <div>
      <h2>Oops.. Could not log in...</h2>
    </div>
  );
}
   
export default LoginFailure;