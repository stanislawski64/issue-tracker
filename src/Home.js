import { useEffect } from 'react';

function Home() {
  // useEffect(() => {
  //   const getToken = async () => {
  //     return await fetch('http://localhost:3001/authentication/guest');
  //   };
  //   const token = getToken();
  //   console.log(token);
  //   fetch('http://localhost:3001/issues', {
  //     method: 'get',
  //     headers: {
  //       Authorization:
  //         'Bearer ' +
  //         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjgsImlhdCI6MTYxNDI1MjE5MiwiZXhwIjoxNjI5ODA0MTkyfQ.-q5vPQElaVRKPlVaBSjoRnfhp4Bg8UYcFIxd5b9RPUg',
  //     },
  //   })
  //     .then((results) => results.json())
  //     .then((data) => console.log(data));
  // }, []);

  return (
    <div className="ContentContainer">
      <main className="MainContent">
        HOME HOME HOME HOME HOME HOME HOME HOME HOME HOME HOME HOME HOME HOME
        HOME HOME HOME HOME HOME HOME HOME HOME HOME HOME HOME HOME HOME HOME
        HOME HOME HOME HOME HOME HOME HOME HOME HOME HOME HOME HOME HOME HOME
        HOME HOME HOME HOME HOME HOME HOME HOME HOME HOME HOME HOME HOME HOME
        HOME HOME HOME HOME HOME HOME HOME HOME
      </main>
    </div>
  );
}

export default Home;
