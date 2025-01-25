const courses = [
  {
    title: "JavaScript",
    description: "Learn JavaScript basics",
    image: "/assets/js.webp",
    detailsPage: "/course-details/javascript.html",
    rating: 4.5,
    level: "Beginner",
  },
  {
    title: "HTML/CSS",
    description: "Learn HTML and CSS basics",
    image: "/assets/css.webp",
    detailsPage: "/course-details/comming-soon.html",
    rating: 4.8,
    level: "Beginner",
  },
 
  {
    title: "React",
    description: "Learn React basics",
    image: "/assets/react.webp",
    // detailsPage: "/course-details/react.html",
    detailsPage: "/course-details/comming-soon.html",
    rating: 4.2,
    level: "Intermediate",
  },
  {
    title: "Angular",
    description: "Learn Angular basics",
    image: "/assets/angular.webp",
    // detailsPage: "/course-details/angular.html",
    detailsPage: "/course-details/comming-soon.html",
    rating: 4.5,
    level: "Advanced",
  },
  {
    title: "Vue",
    description: "Learn Vue basics",
    image: "/assets/vue.webp",
    detailsPage: "/course-details/comming-soon.html",
    rating: 4.8,
    level: "Intermediate",
  },
  {
    title: "Node",
    description: "Learn Node basics",
    image: "/assets/nodejs.webp",
    detailsPage: "/course-details/comming-soon.html",
    rating: 4.2,
    level: "Advanced",
  },
];

const coursesList = document.getElementById("courses");

courses.forEach((course) => {
  const courseItem = document.createElement("div");
  courseItem.className = "course-item";
  courseItem.innerHTML = `
    <div class="course-item-image">
      <img src="${course.image}" alt="${course.title} image">
    </div>
    <div class="course-item-info">
      <h3>${course.title}</h3>
      <p>${course.description}</p>
      <p>Rating: ${course.rating} / 5</p>
      <p>Level: ${course.level}</p>
      <button class="course-item-btn" onclick="checkDetailsPage('${course.detailsPage}')">Check Details</button>
    </div>
  `;
  coursesList.appendChild(courseItem);
});

function checkDetailsPage(url) {
  fetch(url)
    .then(response => {
      if (response.ok) {
        window.location.href = url;
      } else {
        window.location.href = '/404.html';
      }
    })
    .catch(() => {
      window.location.href = '/404.html';
    });
}

