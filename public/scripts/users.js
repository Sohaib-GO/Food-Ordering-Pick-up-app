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
$(document).on("click", ".order-button", function (e) {
  e.preventDefault();
  const container = $(this).closest(".menu-container");
  const menuId = container.data("id");
  const quantity = 1;
  const instructions = "none";
  const price = parseFloat(container.find(".price").text().replace('$', ''));
  const orderStatus = 'pending';
// find the value of the menu name
  const menuName = container.find(".name").text();
  $.ajax({
    method: "POST",
    url: "/api/users/orders/add",
    data: {
      menuId: menuId,
      quantity: quantity,
      instructions: instructions,
      price: price,
      orderStatus: orderStatus,
    },
  }).done((response) => {
    $('.order-info .quantity').html(` ${quantity} x`); // add the quantity to the order info
    $('.order-info .price').html(`$ ${price}`); // add the price to the order info
    $('.order-info .menu-name').html(menuName); // add the menu name to the order info
    const tax = (price * 0.05).toFixed(2);
    $('.price-tax .tax').html(tax); // add the tax to the order info
    const total = (price + parseFloat(tax)).toFixed(2);
    $('.price-tax .total').html(total); // add the total to the order info
  }) 
  .fail((error) => {
    // redirect to login page if user is not logged in
    if (error.responseJSON.message === "Unauthorized") {
      window.location.href = "/login";
    }

  }
  );
});
