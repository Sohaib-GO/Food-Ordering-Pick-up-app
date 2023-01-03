// fetch all menu items when the page loads
$(() => {
  $.ajax({
    method: "GET",
    url: "/api/admin",
  }).done((response) => {
    const $menuItemsList = $("#menu-items");
    $menuItemsList.empty();

    for (const item of response.menuItems) {
      const $menuItem = $(`<li class="menu-item" data-id="${item.id}">`).text(
        `${item.food_name} ` +
          ` ${item.food_description} ` +
          ` ${item.price} ` +
          ` ${item.food_category} ` +
          ` ${item.image_url} `
      );
      const $updateButton = $(
        '<button class="update-menu-item-button">Update</button>'
      );
      const $deleteButton = $(
        '<button class="delete-menu-item-button">Delete</button>'
      );
      $menuItem.append($updateButton, $deleteButton);
      $menuItemsList.append($menuItem);
    }

    // hide the update form when the page loads
    $("#menu-item-template").hide();
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
  const $menuItem = $(this).closest(".menu-item");
  const id = $menuItem.data("id");

  $.ajax({
    method: "DELETE",
    url: `/api/admin/${id}`,
  }).done(() => {
    $menuItem.remove();
  });
});

$(document).on("click", ".update-menu-item-button", function () {
  const foodName = $("#food-name").val();
  const foodDescription = $("#food-description").val();
  const price = $("#price").val();
  const foodCategory = $("#food-category").val();
  const imageUrl = $("#image-url").val();

  const $menuItem = $(this).closest(".menu-item");
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
