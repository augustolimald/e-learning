const token = window.localStorage.getItem('token');
if (token) {
  window.addEventListener('load', function () {
    loadCourses();
    document.getElementById('avatar').src = window.localStorage.getItem('image');
    document.getElementById('nome').innerHTML = window.localStorage.getItem('name');
  })
  
} else {
  window.location.href = '../login.html';
}

function search() {
  loadCourses(document.getElementById('searchField').value);
}

function loadCourses (search) {
  document.getElementById('courses').innerHTML = "";

  let url = "http://localhost:5010/courses";
  if (search) {
    url += `?search=${search}`;
  }
  
  fetch(url, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(response => response.json()).then(response => {
    response.forEach(course => {
      const divCard = document.createElement('div');
      divCard.className = 'card bg-secondary';
      divCard.style = 'width: 18rem; align: center';

      const img = document.createElement('img');
      img.className = 'card-img-top';
      img.src = course.image;
      
      const divCardBody = document.createElement('div');
      divCardBody.className = 'card-body';

      const h5 = document.createElement('h5');
      h5.className = 'card-title';
      h5.innerHTML = course.title;
      
      const a = document.createElement('a');
      a.id = course.id;
      a.className = 'btn btn-success';
      a.href = "#";
      a.onclick = function (event) { event.preventDefault(); subscribe(course.id); };
      a.innerHTML = "Inscrever"
      
      divCardBody.appendChild(h5);
      divCardBody.appendChild(a);
      divCard.appendChild(img);
      divCard.appendChild(divCardBody);
      document.getElementById('courses').appendChild(divCard);
    });

    
  }).then(() => {
    fetch(`http://localhost:5010/users/${window.localStorage.getItem('id')}/subscriptions`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
      }
    }).then(response => response.json()).then(response => {
      response.forEach(subs => {
        const a = document.getElementById(subs.course);
        if(!a) {
          return;
        }
        if (subs.done) {
          a.innerHTML = 'Certificado';
          a.onclick = function (event) { certificado(subs.course); event.preventDefault(); };
        } else {
          a.innerHTML = 'Continuar';
          a.onclick = function (event) { continuar(subs.course); event.preventDefault(); };
        }
      });
    });
  });
}

function subscribe(id) {
  fetch(`http://localhost:5010/courses/${id}/subscribe`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
    }
  }).then(res => {
    if (res.status !== 201) {
      alert("Ocorreu um erro");
    }

    continuar(id);
  })
}

function continuar(id) {
  window.location.href = `course.html?id=${id}`;
}

function certificado(id) {
  fetch(`http://localhost:5010/courses/${id}/certificate`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
    }
  }).then(response => {
    if (response.status !== 200) {
      alert('Erro');
    } else {
      response.json().then(res => window.open(res.url, '_blank'));
    }
  });
}

function sair () {
  window.localStorage.clear();
  window.location.href = '../index.html'
}