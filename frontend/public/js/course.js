const token = window.localStorage.getItem('token');
if (token) {
  window.addEventListener('load', function () {
    loadCourse(getID());
  
    document.getElementById('avatar').src = window.localStorage.getItem('image');
    document.getElementById('nome').innerHTML = window.localStorage.getItem('name');
  })
  
} else {
  window.location.href = '../login.html';
}

function getID() {
  const [, id] = window.location.search.substr(1).split('=');
  return id;
}

function loadCourse(id) {
  fetch(`http://localhost:5010/courses/${id}`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
    }
  }).then(res => {
    if (res.status !== 200) {
      window.location.href = 'dashboard.html';
    }
    return res;
  }).then(res => res.json()).then(course => {
    document.getElementById('curso').innerHTML = course.title;

    const divAulas = document.getElementById('aulas');
    course.classes.forEach(classe => {
      const h3 = document.createElement('h3');
      h3.innerHTML = classe.title;
      divAulas.appendChild(h3);

      const iframe = document.createElement('iframe');
      iframe.width = '420';
      iframe.height = '315';
      iframe.src = classe.video_url;
      divAulas.appendChild(iframe);

      const p = document.createElement('p');
      p.className = '';
      p.innerHTML = classe.text;
      divAulas.appendChild(p);

      divAulas.appendChild(document.createElement('br'));
    });

    const divProva = document.getElementById('prova');
    course.final_test.forEach((test, index) => {
      const p = document.createElement('p');
      p.className = 'descriptionsParagraph';
      p.innerHTML = test.description;
      divProva.appendChild(p);

      test.options.forEach((option, index1) => {
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `question${index}`
        input.checked = index1 === 0;
        input.value = index1;
        divProva.appendChild(input)

        const label = document.createElement('label');
        label.innerHTML = option;
        label.className = 'optionsLabel'
        divProva.appendChild(label);
        divProva.appendChild(document.createElement('br'))
      });
    });
    divProva.appendChild(document.createElement('br'))
    divProva.appendChild(document.createElement('br'))
  });
}

function pegarRespostas () {
  const respostas = [];
  const total = document.getElementsByClassName('descriptionsParagraph').length;
  for(let i = 0; i < total; i++) {
    respostas.push(document.querySelector(`input[name="question${i}"]:checked`).value);
  }
  return respostas;
}

function submit (id) {
  fetch(`http://localhost:5010/courses/${getID()}/final_test`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      questions: pegarRespostas(),
    }),
  }).then(res => {
    if (res.status !== 200) {
      alert('Erro');
    }
    return res;
  }).then(res => res.json()).then(res => {
    alert(`${res.answersCorrect}/${res.totalAnswers} - ${res.percent}%\n${res.status}`);
    if (res.status === 'Aprovado') {
      window.location.href = 'dashboard.html';
    }
  });;
}

function sair () {
  window.localStorage.clear();
  window.location.href = '../index.html'
}