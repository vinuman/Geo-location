
const getLocationButton = document.getElementById("get-location");
const removeLocationButton = document.getElementById("remove-location");
const mapElement = document.getElementById("map");


const lat = localStorage.getItem("lat");
const long = localStorage.getItem("long");


if (lat && long) {
  getLocationButton.disabled = true;
  showMap(parseFloat(lat), parseFloat(long));
}

// Add click event listener to the Get Location button
getLocationButton.addEventListener("click", () => {
  
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        
        localStorage.setItem("lat", position.coords.latitude);
        localStorage.setItem("long", position.coords.longitude);

       
        getLocationButton.disabled = true;
        showMap(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
       
        alert(`Error: ${error.message}`);
      }
    );
  } else {
    
    alert("Geolocation is not supported by your browser.");
  }
});

// Add click event listener to the Remove Location button
removeLocationButton.addEventListener("click", () => {
  // Remove latitude and longitude from localStorage
  localStorage.removeItem("lat");
  localStorage.removeItem("long");

  
  getLocationButton.disabled = false;
  mapElement.innerHTML = "";
});

// Show the map using Google Maps API
function showMap(lat, long) {
  const mapUrl = `https://maps.google.com/maps?q=${lat},${long}&output=embed`;

  mapElement.innerHTML = `<iframe src="${mapUrl}" frameborder="0" allowfullscreen></iframe>`;
}
