import Input from './Input';
import FormButton from './FormButton';
import { useForm } from 'react-hook-form';

function Register() {
  // useEffect(() => {
  //   async function getToken() {
  //     const response = await fetch(
  //       'http://localhost:3001/authentication/guest',
  //     );
  //     const data = await response.json();
  //     const { authToken } = data;
  //     return authToken;
  //   }
  //   getToken();
  // }, []);

  // const Token = localStorage.getItem("Token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function handleRegistration(data) {
    let FormError = document.getElementsByClassName('FormError')[0];
    if (data.password !== data.repeat_password) {
      FormError.innerHTML = '<p>The passwords do not match</p>';
    } else {
      FormError.innerHTML = '';
      const { repeat_password, ...remainingData } = data;
      console.log(remainingData);
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
        </div>
      </form>
    </main>
  );
}

export default Register;
