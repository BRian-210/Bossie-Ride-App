// Admin dashboard logicasync function loadRides() {
  const res = await fetch('/api/rides');
  const rides = await res.json();
  const rideList = document.getElementById('rideList');
  rideList.innerHTML = '';
  rides.forEach(ride => {
    const li = document.createElement('li');
    li.textContent = `${ride.pickup} → ${ride.destination} | Fare: KES ${ride.fare} | ${ride.status}`;
    rideList.appendChild(li);
  });
window.onload = loadRides;
