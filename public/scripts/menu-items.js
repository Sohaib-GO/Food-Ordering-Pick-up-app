export function displayMenu(menuItems) {
  for (const item of menuItems) {
    const $menuContainer = $(
      `<div class="menu-container" id="container-${item.id}"  data-id="${item.id}">`
    );
    const $img = $(`<img src="${item.image_url}" />`);
    const $contentBox = $(`<div class="content-box">`);
    const $name = $(`<h4 class="name">${item.food_name}</h4>`);
    const $description = $(`<p>${item.food_description}</p>`);
    const $price = $(`<h2 class="price">$${item.price}</h2>`);
    const $orderButton = $(`<a class="order-button" href="#">Order Now</a>`);
    const $btn = $(`<div class="btn">  id="order-button-${item.id}`).append($price, $orderButton);
    const empty = $(`<div class="empty">`);

    $contentBox.append($name, $description, $btn);
    $menuContainer.append($img, $contentBox);
    $menuContainer.append(empty);
    $("#menu-items").append($menuContainer);


    
  }
}
