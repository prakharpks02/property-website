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

  const url = `https://platform.flatx.in/?${params.toString()}`;

  // Redirect to the constructed URL
  window.location.href = url;
});

// Get properties api call

function fetchProperties() {
  axios
    .get("http://localhost:8000/api/get-all-properties/")
    .then((response) => {
      console.log("API Response:", response.data.response);

      const properties = response.data.response;

      const propertiesDiv = document.getElementById("featured-properties");

      propertiesDiv.innerHTML = "";

      properties.forEach((property) => {
        // Create a div for each property
        const propertyCard = document.createElement("div");
        propertyCard.className = "property-card";

        // Create the property HTML structure
        propertyCard.innerHTML = `
          <div class="property-image">
            <img src="${property.images[0].url}" alt="${property.title}"  width="25px"/>
          </div>
          <div class="property-details">
            <h3>${property.title}</h3>
            <p> ${property.address}</p>
            <p> ${property.category}</p>
            <p><strong>Price: ₹</strong> ${property.deposit}</p>
          </div>
        `;

        // Append the property card to the main div
        propertiesDiv.appendChild(propertyCard);
      });
    })
    .catch((error) => {
      console.error("Error fetching properties:", error);

      // Display an error message in the div
      const propertiesDiv = document.getElementById("featured-properties");
      propertiesDiv.innerHTML =
        "<p>Failed to load properties. Please try again later.</p>";
    });
}

// Fetch and display properties on window load
window.onload = fetchProperties;
