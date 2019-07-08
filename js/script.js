    $('#name').focus();                              // focus on 'Name' field when page loads

    $('#other-title').hide();                       // Hide 'Job Role' text field                   
    $('#title').on('change', function () {           
        if ($(this).val() === 'other') {           
            $('#other-title').show();              // Show 'Job Role' text field
}       else {
            $('#other-title').hide();             // Keep text field hidden if anything else selected
  }                          
});
    
    // T-Shirt Section
    
    $('#design option:first-child').hide();
    $('#colors-js-puns').hide();               

    $('#color option').hide();                    // Hide color options 
    $('#design').on('change', function () {         
    $('#color').html('');                          // Remove color options from HTML
        if ($(this).val() === "js puns") {             
        
    // Show all colors associated with 'js puns'
    $('#color').append('<option value="cornflowerblue">Cornflower Blue (JS Puns shirt)</option>');        
    $('#color').append('<option value="darkslategrey">Dark Slate Grey (JS Puns shirt)</option>');        
    $('#color').append('<option value="gold">Gold (JS Puns shirt)</option>');
    $('#colors-js-puns').show();

  }     else if ($(this).val() === "heart js") {        

    $('#color').append('<option value="tomato">Tomato (I &#9829; JS shirt)</option>');
    $('#color').append('<option value="steelblue">Steel Blue (I &#9829; JS shirt)</option>');
    $('#color').append('<option value="dimgrey">Dim Grey (I &#9829; JS shirt)</option>');
    $('#colors-js-puns').show();
  }                                               
});


  // Activity Section

    let totalCost = 0;                                             // Set cost
    $('.activities').append('<label>Total Cost: $0</label>');      // Add cost label


    $('[type="checkbox"]').change((e) => {                      
        if (e.target.name === "js-libs" && e.target.checked) {
    $(`input[name="node"]`).attr("disabled", true);               
}       else if (e.target.name === "js-libs" && !e.target.checked) {  // Disable 'node' if 'js-libs' checked
    $(`input[name="node"]`).removeAttr("disabled");
}
        if (e.target.name === "node" && e.target.checked) {
    $(`input[name="js-libs"]`).attr("disabled", true);            
}       else if (e.target.name === "node" && !e.target.checked) {
    $(`input[name="js-libs"]`).removeAttr("disabled");
}
        if (e.target.name === "js-frameworks" && e.target.checked)       {
    $(`input[name="express"]`).attr("disabled", true);                 // Disable 'express' if 'js-frameworks' checked
}       else if (e.target.name === "js-frameworks" && !e.target.checked) {
    $(`input[name="express"]`).removeAttr("disabled");
}
        if (e.target.name === "express" && e.target.checked)            {
    $(`input[name="js-frameworks"]`).attr("disabled", true);               
}       else if (e.target.name === "express" && !e.target.checked) {
    $(`input[name="js-frameworks"]`).removeAttr("disabled");
}

  // Cost calculation
    let activity = e.target;                                                  
    let activityText = activity.parentNode.textContent;                        // Get text content     
    let priceIndex = activityText.indexOf('$');                                // Get $ index value
    let price = activityText.slice(priceIndex + 1);                            

        if (activity.checked) {                                                    
    totalCost += parseInt(price);                                            // Add price to the total cost
  }     else {
    totalCost -= parseInt(price);                                            // subtract total cost if unchecked
  }
    $('.activities label').last().text('Total Cost: $' + totalCost);          
});


 // Payment Section
 
//Create variables for Payment Info Section
    $('#payment option:first').remove();
    const $payOptions =    $('#payment');    
    const $creditPayment = $payOptions.next();               // Select payOptions  
    const $paypalPayment = $payOptions.next().next();
    const $bitcoinPayment = $payOptions.next().next().next();
    const $creditCard = $('#credit-card');
    const $ccNum = $('#cc-num');
    const $zipcode = $('#zip');
    const $cvv = $('#cvv');

//Hide paypal and bitcoin details
    $paypalPayment.hide();
    $bitcoinPayment.hide();
    $payOptions.change(function()           {            // payment options change
        if ( $(this).val() === "credit card" )  {              
    $creditPayment.prop('selected', true);              // Keep credit card information
    $creditCard.attr('hidden', false);
    $paypalPayment.hide();                               // paypal information hidden
    $bitcoinPayment.hide();                             
  }     else if ( $(this).val() === "paypal" ) {        // If paypal option is selected...
    $paypalPayment.prop('selected', true);                                              
    $creditCard.attr('hidden', true);                 
    $paypalPayment.show();                            // Show paypal information
    $bitcoinPayment.hide();                        
  }     else if ( $(this).val() === "bitcoin" ) {       // If bitcoin option selected...
    $bitcoinPayment.prop('selected', true);
    $creditCard.attr('hidden', true);                
    $paypalPayment.hide();                           
    $bitcoinPayment.show();                          
  }
});

// Create and append error messages in red
    $('label[for="name"]').before('<label class="error" id="name-error"><font color="red">Name field must not be empty</font></label>');
    $('label[for="mail"]').before('<label class="error" id="email-error"><font color="red">Please enter a valid email address</font></label>');
    $('.activities legend').before('<label class="error" id="activity-error"><font color="red">Please select at least one activity</font></label>');
    $('#credit-card').before('<label class="error" id="cc-empty-error"><font color="red">Credit Card Number is empty</font></label>');
    $('#credit-card').before('<label class="error" id="cc-number-error"><font color="red">Please enter a valid credit card number between 13-16 digits</font></label>');
    $('#credit-card').before('<label class="error" id="cc-zip-error"><font color="red">Please enter a 5 digit ZIP code</font></label>');
    $('#credit-card').before('<label class="error" id="cc-cvv-error"><font color="red">Please enter a 3 digit CVV number</font></label>');
    $('.error').hide();

// Name validation function
    const validName = (name) => {
    let valid = /^\S/.test(name);                    
        if (valid) {
    $('#name-error').hide();                           // Hide error message if valid name exist
        return true;
  }     else {
    $('#name-error').show();                           // Show error message if 'no valid name' is entered
        return false;
  }
}

// name validation
    $('#name').on('input', (e) => {                      
        if ($('#name').val() == '') {                    // If name field is empty...
    validName($('#name').val());                         // Call validation function
  }     else {
    $('#name-error').hide();                           // hide error message
  }
});

// Email validation function
    const validEmail = (email) => {
    let valid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);  // Test email, with characters '@' and '.' 
        if (valid) {
    $('#email-error').hide();                          // If email valid, hide error message
        return true;
  }     else {
    $('#email-error').show();                         // If email not valid, show error message
        return false;
  }
}

// Email validation
    $('#email').on('input', () =>     {                  
        if ($('#email').val() !== '') {         
    validEmail($('#email').val());              // Call validation function
}       else {
    $('#email-error').hide();                   //  hide error message
  }
});

// Activities function
    const validActivities = () => {
        if ($('.activities input:checked').length > 0) {            
    $('#activity-error').hide();                        
        return true;
  }     else {
    $('#activity-error').show();                      
        return false;
  }
}
//  Activites Validation
    $('.activities').on('input', () => {               
    validActivities();                         // Call Activities function
})

// Hide credit card errors if other payment options selected
    $('#payment').on('change', function() {
        if ($('#payment').val() === 'paypal' || $('#payment').val() === 'bitcoin') {
    $('#cc-cvv-error').hide();
    $('#cc-zip-error').hide();
    $('#cc-number-error').hide();
    $('#cc-empty-error').hide(); 
  }
});

// Credit Card validation function
    const validCardNumber = (cc) => {
        if ($('#payment').val() === 'credit card') {             // If credit card is selected
    let valid = /^\d{13,16}$/.test(cc);                          // credit card numbers must be between 13 to 16 digits

        if (valid) {
    $('#cc-number-error').hide();
    $('#cc-empty-error').hide();                    // If valid, hide error messages
        return true;

  }     else if (cc !== '') {                      // If credit card field is not empty...
    $('#cc-empty-error').hide();                   
    $('#cc-number-error').show();               // Show error message
  }     else {
    $('#cc-number-error').hide();
    $('#cc-empty-error').show();                
        return false;
  }
  }
}

// Validation of Credit Card
    $('#cc-num').on('input', () => {               
        if ($('#cc-num').val() !== '') {                // If credit card number not empty...
    validCardNumber($('#cc-num').val())                 // Call function
  }     else if ($('#cc-num').val() == '') {            // If credit card number empty...
    $('#cc-empty-error').show();                        // Show credit card message
  }     else {
    $('#cc-number-error').show();               
  }
});

// Zip code function
    const validZip = (zip) => {
        if ($('#payment').val() === 'credit card') {      // If credit card selected as payment
    let valid = /^\d{5}$/.test(zip);                      // zip code is 5 digit number

        if (valid) {                                  // If zip code valid...
    $('#cc-zip-error').hide();                       // Hide error message
        return true;
  }     else {
    $('#cc-zip-error').show();                     // show error message
        return false;
  }
}
}

// zip code validation
    $('#zip').on('input', () => {                   
        if ($('#zip').val() !== '') {              // If zipcode is not empty
    validZip($('#zip').val());                      // Calls function
}       else {
    $('#cc-zip-error').hide();                    //  hide error message
  }
});

// CVV Function
    const validCVV = (cvv) => {
        if ($('#payment').val() === 'credit card') {         // If credit card selected as payment
    let valid = /^\d{3}$/.test(cvv);                        // cvv must be 3 digit number

        if (valid) {                                        // If cvv valid...
    $('#cc-cvv-error').hide();                             // Hide error message
        return true;
  }     else {
    $('#cc-cvv-error').show();                         // show error message
        return false;
  }
  }
}

// CVV Validation
    $('#cvv').on('input', () => {                      
        if ($('#cvv').val() !== '') {                  // If cvv input is not empty...
    validCVV($('#cvv').val());                        // Call function
  }     else {
    $('#cc-cvv-error').hide();                      // hide error message
  }
});


    const isValid = () => {
   // If credit card is selected...
        if ($('#payment').val() === 'credit card') {                                  
        if (validName($('#name').val()) && validEmail($('#mail').val()) && validActivities() && validCardNumber($('#cc-num').val()) &&
    validZip($('#zip').val()) && validCVV($('#cvv').val())) {
       return true;                                                            // Returns true if forms are valid
}       else {
    validName($('#name').val());
    validEmail($('#mail').val());
    validActivities();
    validCardNumber($('#cc-num').val());
    validZip($('#zip').val());
    validCVV($('#cvv').val());
        return false;                                                   // Return false if form is invalid
  }
      // If credit card NOT selected...
  }   else {                                                                                           
      if (validName($('#name').val()) && validEmail($('#mail').val()) && validActivities()) {
      return true;                                                                             // Returns true if forms valid
  }   else {
    validName($('#name').val());
    validEmail($('#mail').val());
    validActivities();
      return false;                                                                       // Returns false if form is invalid
  }
}
}

    $('form').on('submit', (e) => {
      if (isValid() === true) {
    window.location.reload();                                                         // Submit button only works if all forms are valid
    
}     else {
    e.preventDefault();                                                            // Submit button will not work otherwise
  }
});

   
