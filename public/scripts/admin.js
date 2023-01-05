import { displayMenu } from "./menu-items.js";

// fetch all menu items when the page loads
const refresh = $(() => {
  // fetch all menu items when the page loads
  $.ajax({
    method: "GET",
    url: "/api/admin",
  }).done((response) => {
    displayMenu(response.menuItems);
    if (response.menuItems.length === 0) {
      $("#menu-items").append("<p>No menu items available</p>");
    }
    const htmlElement = document.querySelector("html");
    const filePath = htmlElement.getAttribute("data-filepath");

    if (filePath === "../../views/admin.ejs") {
      $(".empty").append(
        '<button class="update-menu-item-button">Update</button>',
        '<button class="delete-menu-item-button">Delete</button>'
      );
    }
  });
});

// create a new menu item when the form is submitted
$("#create-menu-item-button").on("click", (event) => {
  event.preventDefault();

  const foodName = $("#food-name").val();
  const foodDescription = $("#food-description").val();
  const price = $("#price").val();
  const foodCategory = $("#food-category").val();
  const imageUrl = $("#image-url").val();

  $.ajax({
    method: "POST",
    url: "/api/admin",
    data: {
      food_name: foodName,
      food_description: foodDescription,
      price: price,
      food_category: foodCategory,
      image_url: imageUrl,
    },
  }).done((response) => {
    const newMenuItem = response.newMenuItem;
    const $menuItemsList = $("#menu-items");

    $(`<li class="menu-item">`)
      .text(`${newMenuItem.food_name} `)
      .appendTo($menuItemsList);
  });
});

// delete a menu item when the delete button is clicked
$(document).on("click", ".delete-menu-item-button", function () {
  // Get the id of the menu item to delete
  const id = $(this).closest(".menu-container").data("id");

  $.ajax({
    method: "DELETE",
    url: `/api/admin/${id}`,
  }).done(() => {
    // Remove the menu item container from the page
    $(this).closest(".menu-container").remove();
  });
});

$(document).on("click", ".update-menu-item-button", function () {
  const foodName = $("#food-name").val();
  const foodDescription = $("#food-description").val();
  const price = $("#price").val();
  const foodCategory = $("#food-category").val();
  const imageUrl = $("#image-url").val();

  const $menuItem = $(this).closest(".menu-container");
  const id = $menuItem.data("id");

  $.ajax({
    method: "put",
    url: `/api/admin/${id}`,
    data: {
      food_name: foodName,
      food_description: foodDescription,
      price: price,
      food_category: foodCategory,
      image_url: imageUrl,
    },
  });
});




// Load pending orders when the page loads
$.ajax({
  url: '/api/admin/orders',
  method: 'GET',
  success: function(orders) {
    for (const order of orders) {
      const template = $('#pending-order-template').html();
      const $orderElem = $(template);

      // Set the order ID
      $orderElem.find('.order-id').text(`Order #${order.id}`);

      // Add the order items
      const $itemTemplate = $($('#order-item-template').html());
      console.log($('#order-item-template').html())
      $orderElem.find('.order-items').append($itemTemplate);
console.log($itemTemplate.find('.item-name'));
      // Add the menu item name and quantity to the template
      $itemTemplate.find('.item-name').text(order.food_name);
      $itemTemplate.find('.item-price').text(order.price);
      // Add the confirm order form
      $orderElem.find('.confirm-order-form').on('submit', function(event) {
        event.preventDefault();
        const waitTime = $(this).find('[name="wait-time"]').val();
        $.ajax({
          url: '/admin/orders/' + order.id + '/confirm',
          method: 'POST',
          data: { waitTime: waitTime },
          success: function() {
            // Remove the order from the pending orders list
            $orderElem.remove();
          }
        });
      });

      // Add the order element to the list of pending orders
      $('.pending-orders').append($orderElem);
    }
  }
});
