document.getElementById("searchButton").addEventListener("click", function () {
  // Get the values from input and dropdowns
  const searchQuery = document.getElementById("searchQuery").value.trim();
  const selectedCategory = document.getElementById("categoryDropdown").value;
  const selectedCity = document.getElementById("cityDropdown").value;

  // Build query parameters
  const params = new URLSearchParams();

  if (selectedCategory) params.append("category", selectedCategory);
  if (selectedCity) params.append("city", selectedCity);
  if (searchQuery) params.append("query", searchQuery);

  // Construct the URL

//   const url = `http://localhost:8000/properties/?${params.toString()}`;



  const url = `https://platform.flatx.in/properties/?${params.toString()}`;


  // Redirect to the constructed URL
  window.location.href = url;   
});
