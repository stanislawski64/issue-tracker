import Input from './Input';
import FormButton from './FormButton';

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

  function handleRegistration(event) {
    console.log('you register');
    event.preventDefault();
  }

  const InputArray = [
    { name: 'E-mail', id: 'email', type: 'text' },
    { name: 'Username', id: 'username', type: 'text' },
    { name: 'Password', id: 'password', type: 'password' },
    { name: 'Repeat Password', id: 'repeat password', type: 'password' },
  ];

  return (
    <main className="MainContentForm">
      <form
        id="Form"
        autoComplete="off"
        onSubmit={handleRegistration}
        className="Form"
      >
        <Input InputArray={InputArray} />
        <FormButton text="Register" />
      </form>
    </main>
  );
}

export default Register;
