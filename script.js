

$(document).ready(function() {

    //PREFILL THE FORM FOR TESTING
    $('#username').val('jorass');
    $('#password').val('b690bc2447d40ea8a6f78345eb979a28');

    $('#login_form').submit(function(e) {
        e.preventDefault();
        let username = $('#username').val();
        let password = $('#password').val();

        // CHECK LOGIN BY LOOPING THROUGH ALL STORED USERNAMES AND PASSWORDS
        let found = false;
        let firstname, lastname;
        for (let user of users) {
            if(user.username === username && user.password === password){
                found = true;
                firstname = user.first_name;
                lastname = user.last_name;
            }
        }

        if (found){
            // SHOW LOGIN MESSAGE AND HIDE THE LOGIN WINDOW
            // LOGIN MESSAGE WILL FADE OUT OR DISAPPEAR IF CLICKED
            $('#login-message').text("Login successful!")
                .removeClass('error').addClass('success')  // change class of message
                .show().fadeOut(5000)                            // fadeout after 5s
                .click(function(){$(this).hide()});              //click to hide
            $('#login_form').hide();
            $('#menu').show();

            // UPDATE LOGGED IN USER
            current_user = get_user_details(username)
            current_balance = get_balance(current_user);

            //LOAD USER INFO DIV
            load_user_box(current_user);

            //LOAD ORDER DIV
            orderTotal = 0;
            $('#order').show();
            $('#order-total').text('Total: ' + orderTotal.toFixed(2) + ' SEK');
        }else{
            //DONT LOAD PAGE, LOGIN FAILED
            $('#login-message').text('Invalid username or password.').removeClass('success').addClass('error').show();
        }

    });

    // LOGIN AS GUEST
    $('#login_as_guest').click(function(){

        //LOAD WEBPAGE IN GUEST MODE, NO ORDERING OR CREDIT
        $('#login-message').text("Logged in as guest!").removeClass('error').addClass('success').show().fadeOut(3000);
        $('#login_form').hide();
        $('#menu').show();
        $('#menu-item-wrapper').css("height","100%");
    });

    // BUTTON FOR DEPOSITING MONEY
    $('#deposit-button').click(function (){
        // SHOW THE POPUP FORM
        $('#popup').show();
    });

    // READ MONEY TO DEPOSIT
    $('#popup form').submit(function (e){
        e.preventDefault();
        let deposit_amount = $('#number-input').val();
        // fake balance, resets on reload !
        // UPDATE BALANCE AND DIV
        current_balance = (Number(current_balance) + Number(deposit_amount)).toString();
        $('#credit').html("<b>Balance: </b>" + current_balance + " SEK");
        $('#popup').hide();
    });

    $('#popup').click(function(e) {
        // IF YOU CLICK OUTSIDE THE POPUP IT WILL CLOSE
        if ($(e.target).attr('id') === 'popup') {
            $('#popup').hide();
        }
    });


    // Load the menu
    let menuDiv = $('#menu-item-wrapper');
    for (let beverage of beers) {
        // LOAD THE DIVS
        let menuItem = $('<div class="menu-item" draggable="true"></div>');
        let itemName = $('<span class="item-name"></span>').text(beverage.namn);
        let infoButton = $('<span class="info-button"></span>').html(' &#9432');
        let itemButton = $('<button class="item-button"></button>').text(beverage.prisinklmoms + ' SEK');
        let someWrapper = $('<div></div>');

        // STACK THEM
        someWrapper.append(itemName);
        someWrapper.append(infoButton);
        menuItem.append(someWrapper);
        menuItem.append(itemButton);
        menuDiv.append(menuItem);

        // ADD CLICK FUNCTIONS TO ORDER BUTTON AND INFO BUTTON
        itemButton.click(function (){add_to_order(beverage);});
        infoButton.click(function () {show_info_popup(beverage);});
    }

    // ADD CLICK FUNCTION TO ORDER BUTTON
    $('#order-button').click(function (){
        place_order();
    });





});