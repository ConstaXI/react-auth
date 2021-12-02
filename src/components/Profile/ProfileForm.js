import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const history = useHistory();

  const newPasswordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBfC4-CSV7Wpn8ITO-uk0M0EsDy0LnRvrc',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(async (res) => {
      if (!res.ok) {
        const data = await res.json();
        let errorMessage = 'Authentication failed.';
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }
      history.replace('/');
    }).catch(error => alert(error));
  } 

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef} minLength="6"/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
