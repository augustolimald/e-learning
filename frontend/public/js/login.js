if (window.localStorage.getItem('token')) {
  window.location.href = 'user/dashboard.html';
}

async function login() {
  const request = await fetch("http://localhost:5010/login", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: document.getElementById('exampleInputEmail1').value,
      password: document.getElementById('exampleInputPassword1').value,
    }),
  });
  
  if (request.status !== 200) {
    alert('Erro no login');
  } else {
    const response = await request.json();
    window.localStorage.setItem('token', response.token);
    window.localStorage.setItem('id', response.id);
    window.localStorage.setItem('name', response.name);
    window.localStorage.setItem('email', response.email);
    window.localStorage.setItem('image', response.image);
    window.location.href = 'user/dashboard.html';
  }
}