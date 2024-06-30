$(document).ready(function() {
  // HTTP request to get the user details from the backend
  axios.get('http://localhost:8000/user')
    .then(response => {
      const users = (response.data);
      const $tableBody = $('#userTable tbody');

      // Append users to the table
      users.forEach((users, index) => {
        const row = `
          <tr>
            <th scope="row">${index + 1}</th>
            <td>${users.username}</td>
            <td>${users.email}</td>
            <td><button class="btn btn-primary view-details" data-index="${index}">View</button></td>
          </tr>
        `;
        $tableBody.append(row);
      });

      // Event delegation for dynamically added elements
      $tableBody.on('click', '.view-details', function() {
        const userIndex = $(this).data('index');
        const user = users[userIndex];

        // Populate modal with user details
        $('#modalUsername').text(user.username);
        $('#modalEmail').text(user.email);

        // Show the modal
        const modal = new bootstrap.Modal(document.getElementById('userModal'));
        modal.show();
      });
    })
    .catch(error => {
      console.error('Error fetching users:', error);
    });
});
