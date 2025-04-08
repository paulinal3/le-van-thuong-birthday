// import { guests } from './guests.js';
document.addEventListener('DOMContentLoaded', function() {
    // Confetti effect on page load
    setTimeout(function() {
        confetti({
            particleCount: 200,
            spread: 100000,
            origin: { y: 0.5 }
        });
    }, 1000);

    const rsvpNavButton = document.getElementById('rsvpNavButton');
    const rsvpModal = document.getElementById('rsvpModal');
    const closeModal = document.querySelector('.close');
    const submitPhoneButton = document.getElementById('submitPhoneButton');
    const guestPhoneInput = document.getElementById('guestPhoneInput');
    const phoneInputContainer = document.getElementById('phoneInputContainer');
    const partyDetails = document.getElementById('partyDetails');
    const partyName = document.getElementById('partyName');
    const inviteesList = document.getElementById('inviteesList');
    const privateCelebration = document.getElementById('privateCelebration');
    const rsvpActions = document.getElementById('rsvpActions');

    const guests = [
        { 
            phones: ["7044416580", "7035081135"],
            name: "Thăng Lê", 
            invitees: ["Thomas Lê", "Mignon Lê", "Michael Lê", "Christina Lê", "Paulina Lê", "Lee Kaufman"],
            isImmediateFam: true
        }, 
        {
            phones: ["7032824957"],
            name: "Thúy Lê", 
            invitees: ["Thúy Lê", "Titi Vũ", "Christopher Vũ", "Kayla Vũ", "Mai-Ly Vũ", "Brice Vũ"],
            isImmediateFam: true
        }, 
        { 
            phones: ["7039634022", "7035097016"],
            name: "Thư Trần", 
            invitees: ["Thu Trần", "Hoàng Trần", "Vinh Trần"],
            isImmediateFam: true
        },
        { 
            phones: ["7036243576"],
            name: "Thương Lê", 
            invitees: ["Thương Lê", "Mina Bùi", "Huy Lâm", "Audrey Lâm", "Adeline Lâm", "Ti Bùi", "Curtis Flickinger"],
            isImmediateFam: true
        }, 
        { 
            phones: ["5712475533", "5712475534"],
            name: "Thùy Lê", 
            invitees: ["Thùy Lê", "Dũng Nguyễn", "Paul Nguyễn", "Mary Nguyễn", "Bin Nguyễn"],
            isImmediateFam: true
        },
        { 
            phones: ["7036255560"],
            name: "Thạch Lê", 
            invitees: ["Thạch Lê", "Thanh Lê", "Chloe Lê", "Tiana Lê", "Theresa Lê"],
            isImmediateFam: true
        },
        { 
            phones: ["7037959749"],
            name: "Lụư Lê", 
            invitees: ["Lụư Lê", "Logan Lê"],
            isImmediateFam: true
        }, 
        { 
            phones: ["9192723956"],
            name: "Thủy Tíên Lê", 
            invitees: ["Thủy Tíên Lê", "Gina Lê"] 
        }, 
        { 
            phones: ["6785714245"],
            name: "Thảo Trương", 
            invitees: ["Tùng Trịnh", "Thảo Trương", "John Barker", "Mya Barker", "Erin Barker"] 
        }, 
        { 
            phones: ["4437658307"],
            name: "Hiếu Trương", 
            invitees: ["Hiếu Trương", "Tracy", "Kid 1", "Kid 2"] 
        }, 
        { 
            phones: ["7703800751"],
            name: "Tùng Trịnh", 
            invitees: ["Tùng Trịnh"] 
        }, 
        { 
            phones: ["7036250217", "7036246317"],
            name: "Ông Bà", 
            invitees: ["Ông Bà"],
            isImmediateFam: true
        }
    ];

    rsvpNavButton.onclick = function() {
        // Reset modal to initial state
        guestPhoneInput.value = '';
        phoneInputContainer.style.display = "block";
        partyDetails.style.display = "none";
        rsvpModal.style.display = "block";
        rsvpActions.style.display = "none";
        privateCelebration.style.display = "none";
    };

    closeModal.onclick = function() {
        rsvpModal.style.display = "none";
    };

    submitPhoneButton.onclick = function() {
        const guestPhone = guestPhoneInput.value;
        const guestInfo = guests.find(guest => guest.phones.includes(guestPhone));
        guestInfo.isImmediateFam ? privateCelebration.style.display = "block" : privateCelebration.style.display = "none";

        if (guestInfo) {
            partyName.innerHTML = `Respond by <u style="color: #f41818">May 15</u> for <span style="color: #f4c118">${guestInfo.name}</span> household`;
            inviteesList.innerHTML = '';
            guestInfo.invitees.forEach(invitee => {
                const listItem = document.createElement('div');
                listItem.classList.add('inviteeContainer')
                listItem.innerHTML = `<p class='inviteeName'>${invitee}</p>
                                      <div class='rsvpActionButtons'>
                                        <button class="btn btn-unselected small" onclick="updateStatus(this, '${invitee}', 'accept')">Accept</button>
                                        <select class="form-control hidden small button">
                                            <option value="" disabled selected>Select age</option>
                                            <option value="adult">Adult</option>
                                            <option value="child">Child (6-12yrs)</option>
                                            <option value="toddler">Toddler (3-5yrs)</option>
                                            <option value="baby">Baby (under 2yrs)</option>
                                        </select>
                                        <button class="btn btn-unselected small" onclick="updateStatus(this, '${invitee}', 'decline')">Decline</button>
                                      </div>
                                      <span class="error-message" style="color: red;"></span>`;
                inviteesList.appendChild(listItem);
            });
            phoneInputContainer.style.display = "none";
            partyDetails.style.display = "block";
            rsvpActions.style.display = "flex";
        } else {
            alert('Phone number not found.');
        }
    };

    window.updateStatus = function(button, invitee, status) {
        const buttons = button.parentElement.querySelectorAll('button');
        const dropdown = button.parentElement.querySelector('select');
        let errorMessage = button.parentElement.parentElement.querySelector('.error-message');

        buttons.forEach(btn => {
            if (btn === button) {
                btn.classList.add('btn-selected');
                btn.classList.remove('btn-unselected');
                btn.textContent = status === 'accept' ? 'Accepted' : 'Declined';
            } else {
                btn.classList.remove('btn-selected');
                btn.classList.add('btn-unselected');
                btn.textContent = btn.textContent.includes('Accept') ? 'Accept' : 'Decline';
            }
        });

        if (status === 'accept') {
            dropdown.classList.remove('hidden');
            if (dropdown.value === '') {
                errorMessage.textContent = 'Please select an age.';
            } else if (dropdown.value != '') {
                dropdown.classList.add('btn-selected');
            }
        } else {
            dropdown.classList.add('hidden');
            errorMessage.textContent = ''; // Clear error if Decline is selected
        }
    }

    inviteesList.addEventListener('change', function(event) {
        if (event.target.tagName.toLowerCase() === 'select') {
            const dropdown = event.target;
            let errorMessage = dropdown.parentElement.parentElement.querySelector('.error-message');
            if (dropdown.value !== '') {
                errorMessage.textContent = ''; // Clear error if an age is selected
            }
        }
    });

    window.onclick = function(event) {
        if (event.target === rsvpModal) {
            rsvpModal.style.display = "none";
        }
    };

    document.getElementById('rsvpActions').addEventListener('click', function(event) {
        if (event.target && event.target.value === "Send RSVP") {
            if (validateRSVP()) sendRSVPEmail();
        }
    });

    function validateRSVP() {
        let valid = true;

        inviteesList.querySelectorAll('.inviteeContainer').forEach(container => {
            const statusButton = container.querySelector('.btn-selected');
            const dropdown = container.querySelector('select');
            let errorMessage = container.querySelector('.error-message');

            if (!statusButton) {
                errorMessage.textContent = 'Please select Accept or Decline.';
                valid = false;
            } else if (statusButton.textContent === 'Accepted' && dropdown.value === '') {
                errorMessage.textContent = 'Please select an age.';
                valid = false;
            } else {
                errorMessage.textContent = ''; // Clear error message if valid
            }
        });

        return valid;
    }

    function sendRSVPEmail() {
        const guestName = partyName.textContent.match(/for (.*?) household/)[1];
        const rsvpDetails = [];
        inviteesList.querySelectorAll('.inviteeContainer').forEach(container => {
            const name = container.querySelector('.inviteeName').textContent;
            const status = container.querySelector('.btn-selected').textContent;
            const age = container.querySelector('select').value;
            rsvpDetails.push({ name, status, age });
        });

        const templateParams = {
            householdName: guestName,
            rsvpDetails: JSON.stringify(rsvpDetails, null, 2) // Format as JSON
        };

        console.log(`Email details: ${JSON.stringify(templateParams, null, 2)}`);

        emailjs.send("service_ni9np5g", "90_rsvp", templateParams)
            .then(function(response) {
                alert('RSVP sent successfully!');
            }, function(error) {
                alert('Failed to send RSVP: ' + error.text);
            });
    }
});