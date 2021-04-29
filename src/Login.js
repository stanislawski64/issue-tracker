import Input from './Input';
import FormButton from './FormButton';
import { useForm } from 'react-hook-form';
import { useAuth } from './auth-context';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
