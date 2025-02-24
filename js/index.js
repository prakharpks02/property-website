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

document.addEventListener("DOMContentLoaded", async function () {
  const app = {
    properties: [],
    isLoading: false,
    error: null,

    async fetchProperties() {
      try {
        this.isLoading = true;
        document.getElementById("loading").style.display = "block";

        const response = await fetch(
          "http://localhost:8000/api/get-all-properties/"
        );
        const data = await response.json();

        if (!data.response || !Array.isArray(data.response)) {
          throw new Error("Invalid API response format");
        }

        this.properties = data.response;
        this.renderProperties();
      } catch (error) {
        this.error = "Failed to load properties. Please try again later.";
        document.getElementById("error").textContent = this.error;
      } finally {
        this.isLoading = false;
        document.getElementById("loading").style.display = "none";
      }
    },

    renderProperties() {
      const propertiesContainer = document.getElementById("properties-list");
      propertiesContainer.innerHTML = ""; // Clear existing content

      // Sort by most recently added (assuming API response has a 'created_at' field)
      const recentProperties = this.properties
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Newest first
        .slice(0, 6); // Get only the latest 6 properties

      recentProperties.forEach((property) => {
        const propertyItem = document.createElement("div");
        propertyItem.className = "property-card";
        propertyItem.innerHTML = `
     <div class="property-image">
    <img src="${property.images[0].url}" alt="${property.title}" style="object-fit: cover;">

</div>
<div class="property-details-inner">
    <div class="property-details">
        
      <h3><a href="https://platform.flatx.in/property-details?propertyId=${property.propertyId}" target="_blank">${property.title}</a></h3>  

        <i class="fa fa-map-marker"></i><span> ${property.address}, ${property.city}</span>
        <div class="property-info">

            <span> <i class='fas fa-building'></i> ${property.category} </span>
            <span>
                <i class='fa fa-user'></i> ${property.preferredTenants} </span>
            <span> <i class="fa fa-car"></i> ${property.parking} </span>

            <span>
                <i class="fa fa-circle"></i>
                ${property.status}</span>



        </div>


    </div>


    <div class="property-footer">
        <h5> ₹ ${property.rent}/month</h5>
       
        <div class="icons">
         <h5> ₹ ${property.deposit}</h5>
        </div>
    </div>
</div>`;
        propertiesContainer.appendChild(propertyItem);
      });
    },
  };

  await app.fetchProperties();
});
