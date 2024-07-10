document.getElementById("form1").addEventListener("submit", function(event) {
    event.preventDefault();

    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var dob = document.getElementById("dob").value.trim();
    var cardnumber = document.getElementById("cardnumber").value.trim();
    var cvv = document.getElementById("cvv").value.trim();
    var expirymonth = document.getElementById("expirymonth").value.trim();
    var expiryyear = document.getElementById("expiryyear").value.trim();

    var waterbottle = parseInt(document.getElementById("numberofwaterbottler").value) || 0;
    var numberofcaps = parseInt(document.getElementById("numberofcaps").value) || 0;
    var numberofpens = parseInt(document.getElementById("numberofpens").value) || 0;
    var numberofcandey = parseInt(document.getElementById("numberofcandey").value) || 0;
    var numberofcups = parseInt(document.getElementById("numberofcups").value) || 0;
    
    hideError();
    
    var isValid = true;
    


    if (!expiryyear) {
        displayError("Please enter your card's expiry year.");
        isValid = false;
    } else if (!/^\d{4}$/.test(expiryyear)) {
        displayError("Please enter a valid expiry year format (YYYY).");
        isValid = false;
    }

    if (!expirymonth) {
        displayError("Please enter your card's expiry month.");
        isValid = false;
    } else if (!/^[a-zA-Z]*$/.test(expirymonth) || expirymonth.length !== 3) {
        displayError("Please enter a valid expiry month format (MMM).");
        isValid = false;
    }

    if (!cvv) {
        displayError("Please enter your CVV.");
        isValid = false;
    } else if (!/^\d{3}$/.test(cvv)) {
        displayError("Please enter a valid CVV in this format (xxx).");
        isValid = false;
    }

    if (!cardnumber) {
        displayError("Please enter your card number.");
        isValid = false;
    } else if (!/^\d{4}-\d{4}-\d{4}-\d{4}$/.test(cardnumber)) {
        displayError("Please enter a valid card number in this format xxxx-xxxx-xxxx-xxxx");
        isValid = false;
    }

    if (!dob) {
        displayError("Please enter your date of birth.");
        isValid = false;
    }

    if (!email) {
        displayError("Please enter your email address.");
        isValid = false;
    }

    if (!name) {
        displayError("Please enter your name.");
        isValid = false;
    } else if (!/^[a-zA-Z\s]*$/.test(name)) {
        displayError("Please enter a valid name.");
        isValid = false;
    }

    
    var itemsBought = waterbottle + numberofcaps + numberofpens + numberofcandey + numberofcups ;
    if (itemsBought === 0) {
        displayError("Please fill out all fields and buy at least one item.");
        isValid = false;
    }

    
    
    

    if (isValid) {
        var numberofwaterbottleprice = 5.00;
        var numberofcapsprice = 20.00;
        var numberofpensprice = 2.00;
        var numberofcandeyprice = 10.00;
        var numberofcupsprice = 3.00;
        var taxrate = 0.13;
        
        var numberofwaterbottletotal = waterbottle * numberofwaterbottleprice;
        var numberofcapstotal = numberofcaps * numberofcapsprice;
        var numberofpenstotal = numberofpens * numberofpensprice;
        var numberofcandeytotal = numberofcandey * numberofcandeyprice;
        var numberofcupstotal = numberofcups * numberofcupsprice;
        
        var subtotal = numberofwaterbottletotal + numberofcapstotal + numberofpenstotal + numberofcandeytotal + numberofcupstotal;
        var totaltax = subtotal * taxrate;
        var salestotal = subtotal + totaltax;
        var donationamount = subtotal * 0.1;
        if (donationamount < 10) {
            donationamount = 10;
        }


        var invoicedetails = "<h3>Card Details</h3>"
        invoicedetails += `<p>Name: ${name}</p>`;
        invoicedetails += `<p>Email: ${email}</p>`;
        invoicedetails += `<p>Date Of Birth: ${dob}</p>`;
        invoicedetails += `<p>Credit Card Number: ${cardnumber.replace(/\d(?=\d{4})/g, '*')}</p>`;
        invoicedetails += `<p>CVV: ${cvv}</p>`;
        invoicedetails += `<p>Credit Card Expiry Month: ${expirymonth}</p>`;
        invoicedetails += `<p>Credit Card Expiry Year: ${expiryyear}</p>`;
        
        invoicedetails += "<h3>Order Summary</h3>";
        if (waterbottle > 0) invoicedetails += `<p>Number of Water Bottles Purchased: ${waterbottle} @ $${numberofwaterbottleprice.toFixed(2)} each, Subtotal: $${numberofwaterbottletotal.toFixed(2)}</p>`;
        if (numberofcaps > 0) invoicedetails += `<p>Number of Caps Purchased: ${numberofcaps} @ $${numberofcapsprice.toFixed(2)} each, Subtotal: $${numberofcapstotal.toFixed(2)}</p>`;
        if (numberofpens > 0) invoicedetails += `<p>Number of Pens Purchased: ${numberofpens} @ $${numberofpensprice.toFixed(2)} each, Subtotal: $${numberofpenstotal.toFixed(2)}</p>`;
        if (numberofcandey > 0) invoicedetails += `<p>Number of Candy Bags Purchased: ${numberofcandey} @ $${numberofcandeyprice.toFixed(2)} each, Subtotal: $${numberofcandeytotal.toFixed(2)}</p>`;
        if (numberofcups > 0) invoicedetails += `<p>Number of Cup Cakes Purchased: ${numberofcups} @ $${numberofcupsprice.toFixed(2)} each, Subtotal: $${numberofcupstotal.toFixed(2)}</p>`;
        
        invoicedetails += `<p>Donation Amount: $${donationamount.toFixed(2)}</p>`;
        invoicedetails += `<p>Subtotal: $${subtotal.toFixed(2)}</p>`;
        invoicedetails += `<p>Tax: $${totaltax.toFixed(2)}</p>`;
        invoicedetails += `<p>Total: $${salestotal.toFixed(2)}</p>`;
        
        document.getElementById('invoice-details').innerHTML = invoicedetails;
        document.getElementById('invoice').style.display = "block";
    }
});

function displayError(message) {
    var errorElement = document.getElementById('error-message');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError() {
    var errorElement = document.getElementById('error-message');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}
