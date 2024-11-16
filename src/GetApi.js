const options = {method: 'GET'};

fetch('https://api.enem.dev/v1/exams/{year}/questions', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));