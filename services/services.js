document.addEventListener('DOMContentLoaded', () => {
  let courses = [];
  let filteredCourses = [];
  let currentIndex = 0;
  const itemsPerLoad = 9;

  const container = document.getElementById('courses-container');

  const createCourseCard = (course) => {
    const courseCard = document.createElement('div');
    courseCard.className = 'course-card';
    const imageDiv = document.createElement('div');
    imageDiv.className = "imageDiv";

    const courseImage = document.createElement('img');
    courseImage.src = course.profile_picture.url;
    courseImage.alt = course.name;

    const courseName = document.createElement('h2');
    courseName.textContent = course.name;

    const courseCity = document.createElement('p');
    courseCity.className = 'city';
    courseCity.textContent = `Şəhər: ${course.city}`;

    const coursePrice = document.createElement('p');
    coursePrice.className = 'price';
    coursePrice.textContent = `Qiymət: ${course.price} AZN`;

    const courseType = document.createElement('p');
    courseType.className = "courseType";
    courseType.textContent = `Kurs növü: ${course['course-type']}`;

    const courseGmail = document.createElement('p');
    courseGmail.className = 'gmail';
    courseGmail.textContent = `Email: ${course.gmail}`;

    const coursePhoneNumber = document.createElement('p');
    coursePhoneNumber.className = 'phone-number';
    coursePhoneNumber.textContent = `Telefon: ${course['phone-number']}`;

    imageDiv.appendChild(courseImage);
    courseCard.appendChild(imageDiv);
    courseCard.appendChild(courseName);
    courseCard.appendChild(courseCity);
    courseCard.appendChild(coursePrice);
    courseCard.appendChild(courseType);
    courseCard.appendChild(courseGmail);
    courseCard.appendChild(coursePhoneNumber);

    return courseCard;
  };

  const loadCourses = (startIndex, endIndex) => {
    const slice = filteredCourses.slice(startIndex, endIndex);
    slice.forEach(course => {
      const courseCard = createCourseCard(course);
      container.appendChild(courseCard);
    });
  };

  const filterCourses = () => {
    const searchValue = document.getElementById('searchBarValue').value.toLowerCase();
    const typeValue = document.getElementById('typeSelect').value.toLowerCase();
    const nameOrderText = document.getElementById('nameOrder').innerText;
    const priceOrderText = document.getElementById('priceOrder').innerText;

    filteredCourses = courses.filter(course => {
      return course.name.toLowerCase().includes(searchValue) &&
        (typeValue === 'select' || course['course-type'].toLowerCase().includes(typeValue));
    });

    if (nameOrderText.includes('↑')) {
      filteredCourses.sort((a, b) => a.name.localeCompare(b.name));
    } else if (nameOrderText.includes('↓')) {
      filteredCourses.sort((a, b) => b.name.localeCompare(a.name));
    }

    if (priceOrderText.includes('↑')) {
      filteredCourses.sort((a, b) => a.price - b.price);
    } else if (priceOrderText.includes('↓')) {
      filteredCourses.sort((a, b) => b.price - a.price);
    }

    currentIndex = 0;
    container.innerHTML = '';
    loadCourses(0, itemsPerLoad);
  };

  fetch('courses.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      courses = data;
      filteredCourses = data;
      loadCourses(0, itemsPerLoad);

      document.getElementById('load-more').addEventListener('click', () => {
        currentIndex += itemsPerLoad;
        if (currentIndex < filteredCourses.length) {
          loadCourses(currentIndex, currentIndex + itemsPerLoad);
        } else {
          document.getElementById('load-more').style.display = 'none';
        }
      });

      document.getElementById('searchBarValue').addEventListener('input', filterCourses);
      document.getElementById('typeSelect').addEventListener('change', filterCourses);
    })
    .catch(error => {
      console.error('Error fetching courses:', error);
    });

  document.getElementById('nameOrder').addEventListener('click', e => {
    document.getElementById('priceOrder').innerText = 'Price';
    const order = e.target.innerText;
    if (order === 'Name' || order === 'Name↓') {
      e.target.innerText = 'Name↑';
    } else if (order === 'Name↑') {
      e.target.innerText = 'Name↓';
    }
    filterCourses();
  });

  document.getElementById('priceOrder').addEventListener('click', e => {
    document.getElementById('nameOrder').innerText = 'Name';
    const order = e.target.innerText;
    if (order === 'Price' || order === 'Price↓') {
      e.target.innerText = 'Price↑';
    } else if (order === 'Price↑') {
      e.target.innerText = 'Price↓';
    }
    filterCourses();
  });
});


