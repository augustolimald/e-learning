if (window.localStorage.getItem('token')) {
  window.location.href = 'dashboard.html';
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
    window.localStorage.setItem('token', request.body.token);
    window.localStorage.setItem('id', request.body.id);
    window.location.href = 'dashboard.html';
  }
}