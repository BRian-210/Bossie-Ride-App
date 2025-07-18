const socket = io();
let map;
let driverMarkers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -1.2921, lng: 36.8219 },
    zoom: 13,
  });

  // Autocomplete
  new google.maps.places.Autocomplete(document.getElementById("pickup"));
  new google.maps.places.Autocomplete(document.getElementById("destination"));
}

function addDriverMarker(location) {
  const marker = new google.maps.Marker({
    position: location,
    map,
    icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
  });
  driverMarkers.push(marker);
}

function clearMarkers() {
  driverMarkers.forEach(m => m.setMap(null));
  driverMarkers = [];
}

socket.on("driverLocation", (data) => {
  clearMarkers();
  addDriverMarker(data.location);
});

const rideForm = document.getElementById("rideForm");
rideForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const pickup = document.getElementById("pickup").value;
  const destination = document.getElementById("destination").value;
  const token = localStorage.getItem("token");

  try {
    const res = await fetch("http://localhost:3000/api/ride/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ pickup, destination })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to request ride");
    }

    alert("✅ Ride requested. Fare: KES " + data.fare);
  } catch (err) {
    console.error("Ride request error:", err);
    alert("❌ Error requesting ride: " + err.message);
  }
});
/* rider.html styles start here */
