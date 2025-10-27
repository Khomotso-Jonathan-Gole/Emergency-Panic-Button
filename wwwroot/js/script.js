
   /**
 * @author Khomotso Jonathan Gole <khomotsojonathan2@gmail.com>
 */
function sendAlert() {
  const category = document.getElementById('category').value;
  const message = document.getElementById('confirmationMsg');
  const panicButton = document.querySelector('.panic-button');


  if (!category) {
    message.style.color = 'red';
    message.textContent = "❗ Please select Police or Hospital first!";
    return;
  }

  if (!confirm(`🚨 Send ${category === 'police' ? 'POLICE' : 'MEDICAL'} alert?`)) {
    return;
  }

  panicButton.disabled = true;
  message.style.color = 'black';
  message.textContent = "⏳ Getting your location...";


  if (!navigator.geolocation) {
    message.style.color = 'red';
    message.textContent = "❌ Your browser doesn’t support GPS.";
    panicButton.disabled = false;
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {

      const { latitude, longitude } = position.coords;
      const locationLink = `https://www.google.com/maps?q=${latitude},${longitude}`;


      message.style.color = 'green';
      message.innerHTML = `
        ✅ <strong>Alert sent!</strong><br>
        🏥 <u>${category === 'police' ? 'Police' : 'Ambulance'} dispatched</u><br>
        📍 <a href="${locationLink}" target="_blank">Track Help (Google Maps)</a>
      `;
      panicButton.disabled = false;


    },
    (error) => {

      message.style.color = 'red';
      message.textContent =
        error.code === error.PERMISSION_DENIED
          ? "❌ You denied location access. Enable it in settings!"
          : "❌ GPS signal lost. Check connection!";
      panicButton.disabled = false;
    },
    { timeout: 10000 } // 10-second timeout
  );
}


/**
 * @author Khomotso Jonathan Gole <khomotsojonathan2@gmail.com>
 */
function sendToEmergencyAPI(category, lat, lng) {
  console.log(`ALERT: ${category} at ${lat}, ${lng}`);

}


