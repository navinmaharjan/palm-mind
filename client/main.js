$(document).ready(function() {

  const users = [
    { username: 'Ram Thapa', email: 'ram@gmail.com' },
    { username: 'Shyam Karki', email: 'shyam@gmail.com' }
  ];

  const $tableBody = $('#userTable tbody');

  //append user to the table
  users.forEach((user, index) => {
    const row = `
      <tr>
        <th scope="row">${index + 1}</th>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td><button class="btn btn-primary view-details" data-index="${index}">View</button></td>
      </tr>
    `;
    $tableBody.append(row);
  });

  // For modal
  $tableBody.on('click', '.view-details', function() {
    const userIndex = $(this).data('index');
    const user = users[userIndex];

    $('#modalUsername').text(user.username);
    $('#modalEmail').text(user.email);

    const modal = new bootstrap.Modal(document.getElementById('userModal'));
    modal.show();
  });
});
