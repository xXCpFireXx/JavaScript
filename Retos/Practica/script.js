fetch('http://localhost:3000/usuarios')
  .then(res => res.json())
  .then(data => console.log(data));
    