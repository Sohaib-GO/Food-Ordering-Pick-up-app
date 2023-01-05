$("regsiter-button").on("click", () => {
    const searchTerm = $("#search-input").val();
    $.ajax({
      method: "POST",
      url: "/api/register",
      data: {
        search: searchTerm,
      },
    }).done((response) => {
      const $searchResultsList = $("#search-results");
      $searchResultsList.empty();
  
      for (const item of response.items) {
        $(`<li class="search-result">`)
          .text(`${item.food_name} `)
          .appendTo($searchResultsList);
      }
    });
  });