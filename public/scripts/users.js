import { displayMenu } from "./menu-items.js";

// Client facing scripts here
$(() => {
  $("#fetch-users").on("click", () => {
    $.ajax({
      method: "GET",
      url: "/api/users",
    }).done((response) => {
      const $usersList = $("#users");
      $usersList.empty();

      for (const user of response.users) {
        $(`<li class="user">`).text(user.name).appendTo($usersList);
      }
    });
  });
});

// Search for menu items when the search button is clicked
$("#search-button").on("click", () => {
  const searchTerm = $("#search-input").val();
  $.ajax({
    method: "GET",
    url: "/api/users/search",
    data: {
      search: searchTerm,
    },
  }).done((response) => {
    console.log(response);
    // clear the menu items list
    $("#menu-items").empty();
    displayMenu(response.items);
  });
});


// add menu item to cart when the order button is clicked
// $(document).on("click", ".order-button", function () {
//   e.preventDefault();
//   const container = $(this).closest(".menu-container");
//   const menuId = container.data("id");
// const quantity = 1;
// const instructions = "none";
// const price = container.find(".price").text();

//   $.ajax({
//     method: "POST",
//     url: "/api/users/orders/add",
//     data: {
//       menuId: menuId,
//       quantity : quantity,
//       instructions : instructions,
//       total : price,
//     },
//   }).done((response) => {
//     console.log(response);
//   });
