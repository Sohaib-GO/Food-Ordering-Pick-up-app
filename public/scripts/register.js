// add a new user to the database

$(".register_form").submit(function (event) {
  event.preventDefault();

  const name = $("input[name='name']").val();
  const email = $("input[name='email']").val();
  const address = $("input[name='address']").val();
  const phoneNumber = $("input[name='phone_number']").val();
  const password = $("input[name='password']").val();

  console.log({ name, email, address, phoneNumber, password });

  $.ajax({
    type: "POST",
    url: "/register",
    data: {
      name: name,
      email: email,
      address: address,
      phoneNumber: phoneNumber,
      password: password,
    },
    success: function (data) {
      window.location.replace("/homepage");
    },
    error: function (error) {
      if (error.responseText === "User already exists") {
        alert("This user already exists. Please choose a different email.");
      } else {
        alert("Error: " + error.responseText);
      }
    },
  });
});
