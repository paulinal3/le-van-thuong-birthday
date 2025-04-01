import { guests } from './guests.js';

document.addEventListener('DOMContentLoaded', function() {
    // Confetti effect on page load
    setTimeout(function() {
        confetti({
            particleCount: 200,
            spread: 100000,
            origin: { y: 0.5 }
        });
    }, 1000);

    const rsvpModal = document.getElementById('rsvpModal');
    const closeModal = document.querySelector('.close');
    const submitPhone = document.getElementById('submitPhone');
    const guestPhoneInput = document.getElementById('guestPhone');
    const phoneInputSection = document.getElementById('phoneInputSection');
    const partyDetails = document.getElementById('partyDetails');
    const partyName = document.getElementById('partyName');
    const inviteesList = document.getElementById('inviteesList');

    // Ong Noi's Address
    // Pre-birthday celebration (immediate family only)
    // 3:00-6:30pm
    // 6:30pm head to restaurant
    // 40 min drive to Texas
    // Dinner 7:30-9:30

    closeModal.onclick = function() {
        rsvpModal.style.display = "none";
    };

    submitPhone.onclick = function() {
        const guestPhone = guestPhoneInput.value;
        const guestInfo = guests.find(guest => guest.phones.includes(guestPhone));
        if (guestInfo) {
            partyName.textContent = `RSVP for ${guestInfo.name} household`;
            inviteesList.innerHTML = '';
            guestInfo.invitees.forEach(invitee => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `${invitee} 
                                      <button class="actions" onclick="updateStatus('${invitee}', 'accept')">Accept</button>
                                      <button class="actions" onclick="updateStatus('${invitee}', 'decline')">Decline</button>
                                      <select class="field half>
                                          <option value="">Age</option>
                                          <option value="adult">Adult</option>
                                          <option value="child">Child (6-12yrs)</option>
                                          <option value="toddler">Toddler (3-5yrs)</option>
                                          <option value="baby">Baby (under 2yrs)</option>
                                      </select>`;
                inviteesList.appendChild(listItem);
            });
            phoneInputSection.style.display = "none";
            partyDetails.style.display = "block";
            nameInputContainer.style.display = "none";
            partyDetails.style.display = "block";
            rsvpActions.style.display = "flex";
        } else {
            alert('Name not found.');
        }
    };

    window.onclick = function(event) {
        if (event.target === rsvpModal) {
            rsvpModal.style.display = "none";
        }
    };
});

function updateStatus(invitee, status) {
    console.log(`Invitee: ${invitee}, Status: ${status}`);
}