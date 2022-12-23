import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const LoginSuccess = ({ authenticated, userData, isPendingUser, errorUser }) => {

  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push("/profile");
    }, 1000)
  }, [history])

  return (
    <div>
      <h2>Thanks for logging in!</h2>
    </div>
  );
}
   
export default LoginSuccess;
