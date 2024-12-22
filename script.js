document.getElementById('form').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
  
    if (!name || !email || !password) {
      document.getElementById('registered_msg').textContent = 'All fields are required.';
      return;
    }
  
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to register.');
      }
  
      const data = await response.json();
      document.getElementById('registered_msg').textContent = 'Registration Successful!';
    } catch (error) {
      document.getElementById('registered_msg').textContent = 'Registration Failed. Please try again.';
      console.error('Error during registration:', error);
    }
  });
  
  async function fetchEmployees() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch employees.');
      }
  
      const employees = await response.json();
      console.log(employees);
  
      const employeeList = document.getElementById('employeeList');
      employeeList.innerHTML = ''; // Clear existing employee cards
  
      employees.forEach(employee => {
        const employeeCard = document.createElement('div');
        employeeCard.className = 'card';
        employeeCard.setAttribute('role', 'article');
        employeeCard.innerHTML = `
          <h3>${employee.name}</h3>
          <p>Email: <a href="mailto:${employee.email}">${employee.email}</a></p>
          <p>Phone: <a href="tel:${employee.phone}">${employee.phone}</a></p>
          <p>Website: <a href="http://${employee.website}" target="_blank">${employee.website}</a></p>
        `;
        employeeList.appendChild(employeeCard);
      });
    } catch (error) {
      const employeeList = document.getElementById('employeeList');
      employeeList.innerHTML = '<p>Failed to load employees. Please try again later.</p>';
      console.error('Error fetching employees:', error);
    }
  }
  
  // Fetch employees on page load
  fetchEmployees();
  