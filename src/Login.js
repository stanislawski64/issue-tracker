import { useState, useEffect } from 'react';
import Input from './Input';
import FormButton from './FormButton';
import Snackbar from './Snackbar';
import { useForm } from 'react-hook-form';
import { useAuth } from './auth-context';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function Login() {
  const { token } = useAuth();

  const history = useHistory();

  useEffect(() => {
    if (token) {
      history.push('/board');
    }
  }, [token, history]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();

  const [snackbar, setSnackbar] = useState(false);

  const [snackbarType, setSnackbarType] = useState('error');

  useEffect(() => {
    if (!location.state) return;
    if (location.state.notLoggedIn)
      setSnackbar('You have to be logged in to view that page.');
    if (location.state.registered) {
      setSnackbar('You have successfully registered. Now you can log in.');
      setSnackbarType('success');
    }
    window.history.replaceState(null, '');
  }, [location]);

  const { login } = useAuth();

  const InputArray = [
    {
      name: 'Username',
      id: 'username',
      type: 'text',
      ref: {
        ...register('username', {
          required: 'You must specify a valid username',
          minLength: {
            value: 4,
            message: 'You must specify a valid username',
          },
        }),
      },
    },
    {
      name: 'Password',
      id: 'password',
      type: 'password',
      ref: {
        ...register('password', {
          required: 'You must specify a valid password',
          minLength: {
            value: 4,
            message: 'You must specify a valid password',
          },
        }),
      },
    },
  ];

  return (
    <main className="MainContentForm">
      {snackbar && (
        <Snackbar
          type={snackbarType}
          setOpen={setSnackbar}
          message={snackbar}
          showFor={6000}
          caseSpecificClass="SnackbarFormOverride"
        />
      )}
      <form
        id="Form"
        autoComplete="off"
        onSubmit={handleSubmit(login)}
        className="Form"
      >
        <Input InputArray={InputArray} />
        <FormButton text="Login" />
        <div className="FormError">
          {errors.username && <p>{errors.username.message}</p>}
          {errors.password && <p>{errors.password.message}</p>}
        </div>
      </form>
    </main>
  );
}

export default Login;
