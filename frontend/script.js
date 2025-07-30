async function searchJobs() {
  const skill = document.getElementById('skillInput').value;
  const location = document.getElementById('locationInput').value;
  const query = `${skill} in ${location}`;

  const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&page=1&num_pages=1&country=rw`;

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '0a6d98433dmshb9ab3f63667ac77p1acfe4jsnb238e61cc2ca',
      'x-rapidapi-host': 'jsearch.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    displayJobs(data.data);
  } catch (error) {
    console.error('Error fetching jobs:', error);
  }
}

function displayJobs(jobs) {
  const jobResults = document.getElementById("job-results");
  jobResults.innerHTML = "";

  if (!jobs || jobs.length === 0) {
    jobResults.innerHTML = "No jobs found.";
    return;
  }

  jobs.forEach(job => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${job.job_title}</h3>
      <p><strong>Company:</strong> ${job.employer_name}</p>
      <p><strong>Location:</strong> ${job.job_city}</p>
      <a href="${job.job_apply_link}" target="_blank">Apply</a>
      <hr/>
    `;
    jobResults.appendChild(div);
  });
}


function saveEmail() {
 
  const email = document.getElementById("emailInput").value;

  
  if (email.trim() === "") {
    document.getElementById("message").textContent = "Please enter an email.";
    return;
  }


  localStorage.setItem("userEmail", email);

  
  document.getElementById("message").textContent = `Saved: ${email}`;
}



window.onload = function () {
  const savedEmail = localStorage.getItem("userEmail");
  if (savedEmail) {
    document.getElementById("emailInput").value = savedEmail;
    document.getElementById("message").textContent = `Loaded saved email: ${savedEmail}`;
  }
};
