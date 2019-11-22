fetch("http://localhost:5010/courses", {
  method: "GET",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
}).then(response => response.json()).then(response => {
  const courses = response.splice(0,3);
  courses.forEach((course, index) => {
    document.getElementsByClassName("card-title")[index].innerHTML = course.title;
    document.getElementsByClassName("card-img-top")[index].src = course.image;
    document.getElementsByClassName("d-block")[index].src = course.image;
  });
});



