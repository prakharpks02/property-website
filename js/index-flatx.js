var app = new Vue({
  el: "#flatx-app",
  delimiters: ["[[", "]]"],

  data: {
    properties: [],
    isLoading: false,
    error: null,
  },

  methods: {
    fetchProperties() {
      this.isLoading = true;
      this.error = null;
      axios
        .get("http://localhost:8000/api/get-all-properties/")
        .then((response) => {
          this.properties = response.data.response;
          console.log("Properties loaded:", this.properties);
        })
        .catch((error) => {
          this.error = "Failed to load properties. Please try again later.";
          console.error("Error fetching properties:", error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    // formatDate(timestamp) {
    //   const date = new Date(parseInt(timestamp) * 1000);
    //   return date.toLocaleDateString("en-GB");
    // },
  },

  created() {
    this.fetchProperties();
  },
});
