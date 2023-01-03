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
