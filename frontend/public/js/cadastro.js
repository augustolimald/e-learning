function changePic() {
  document.getElementById("picLabel").innerHTML = document.getElementById("customFileLang").value.split("\\").pop();
}

async function uploadImage() {
  const formData = new FormData();
  formData.append('file', document.getElementById('customFileLang').files[0]);
  const request = await fetch("http://localhost:5010/upload", {
      method: "POST",
      body: formData,
  });
  const response = await request.json();

  return response.filename;
}

async function send() {
  const filename = await uploadImage();
  const user = {
      name: document.getElementById("exampleInputNome1").value,
      email: document.getElementById("exampleInputEmail1").value,
      password: document.getElementById("exampleInputSenha1").value,
      image: filename,
  };

  const request = await fetch("http://localhost:5010/users", {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
  });

  if (request.status == 400) {
      alert(request.body.error);
  } else if (request.status !== 201) {
      alert("Erro ao cadastrar o usuário");
  } else {
      document.location.href = "login.html";
  }
}