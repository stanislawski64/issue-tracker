import Input from './Input';
import FormButton from './FormButton';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from './auth-context';
import { useHistory } from 'react-router-dom';

function Register() {
  const { token } = useAuth();

  const { register: apiRegister } = useAuth();

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

  const [passwordsMatched, setPasswordsMatched] = useState(true);

  function handleRegistration(data) {
    if (data.password !== data.repeat_password) {
      setPasswordsMatched(false);
      return;
    } else {
      const { repeat_password, ...remainingData } = data;
      apiRegister(remainingData);
    }
  }

  const InputArray = [
    {
      name: 'E-mail',
      id: 'email',
      type: 'email',
      ref: {
        ...register('email', { required: 'You must specify an email' }),
      },
    },
    {
      name: 'Username',
      id: 'username',
      type: 'text',
      ref: {
        ...register('username', {
          required: 'You must specify a username',
          minLength: {
            value: 4,
            message: 'Username must have at least 4 characters',
          },
          maxLength: {
            value: 30,
            message: 'Username cannot be longer than 30 characters',
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
          required: 'You must specify a password',
          minLength: {
            value: 4,
            message: 'Password must have at least 4 characters',
          },
        }),
      },
    },
    {
      name: 'Repeat Password',
      id: 'repeat password',
      type: 'password',
      ref: {
        ...register('repeat_password'),
      },
    },
  ];

  return (
    <main className="MainContentForm">
      <form
        id="Form"
        autoComplete="off"
        onSubmit={handleSubmit(handleRegistration)}
        className="Form"
      >
        <Input InputArray={InputArray} />
        <FormButton text="Register" />
        <div className="FormError">
          {errors.email && <p>{errors.email.message}</p>}
          {errors.username && <p>{errors.username.message}</p>}
          {errors.password && <p>{errors.password.message}</p>}
          {passwordsMatched ? null : <p>The passwords do not match</p>}
        </div>
      </form>
    </main>
  );
}

export default Register;
