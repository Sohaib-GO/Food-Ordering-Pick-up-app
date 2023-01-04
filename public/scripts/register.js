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
      console.log(data);
      window.location.replace("/homepage");
    },
    error: function (error) {
      console.log(error);
    },
  });
});
