$(document).ready(function () {
  const users = [
    { username: "Ram Thapa", email: "ram123@gmail.com" },
    { username: "Sita Gurung", email: "sitagrg@gmail.com" },
    { username: "Shyam Shrestha", email: "shyamShrestha@gmail.com" },
  ];

  const $tableBody = $("#userTable tbody");

  users.forEach((user, index) => {
    const row = `
        <tr>
          <th scope="row">${index + 1}</th>
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td><button class="btn btn-primary">View</button></td>
        </tr>
      `;
    $tableBody.append(row);
  });
});
