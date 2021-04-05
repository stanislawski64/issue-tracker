import Input from './Input';
import FormButton from './FormButton';

function Login() {
  function handleLogin(event) {
    console.log('you login');
    event.preventDefault();
  }

  const InputArray = [
    { name: 'Username', id: 'username', type: 'text' },
    { name: 'Password', id: 'password', type: 'password' },
  ];

  return (
    <main className="MainContentForm">
      <form
        id="Form"
        autoComplete="off"
        onSubmit={handleLogin}
        className="Form"
      >
        <Input InputArray={InputArray} />
        <FormButton text="Login" />
      </form>
    </main>
  );
}

export default Login;
