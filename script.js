

$(document).ready(function() {

    //prefill form as default
    $('#username').val('jorass');
    $('#password').val('b690bc2447d40ea8a6f78345eb979a28');
    $('#login_form').submit(function(e) {
        e.preventDefault();
        let username = $('#username').val();
        let password = $('#password').val();

        //check if login valid
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
            $('#login-message').text("Login successful!").removeClass('error').addClass('success').show().fadeOut(3000);
            $('#login-message').click(function(){$(this).hide()});
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


    $('#deposit-button').click(function (){
        $('#popup').show();
    });

    $('#popup form').submit(function (e){
        e.preventDefault();
        let deposit_amount = $('#number-input').val();
        // CHANGE BALANCE AND UPDATE DIV

        // fake balance, resets on reload
        current_balance = (Number(current_balance) + Number(deposit_amount)).toString();
        $('#credit').html("<b>Balance: </b>" + current_balance + " SEK");
        $('#popup').hide();
    });

    $('#popup').click(function(e) {
        if ($(e.target).attr('id') === 'popup') {
            $('#popup').hide();
        }
    });


    // Load the menu
    let menuDiv = $('#menu-item-wrapper');
    for (let beverage of beers) {
        let menuItem = $('<div class="menu-item" draggable="true"></div>');
        let itemName = $('<span class="item-name"></span>').text(beverage.namn);
        let infoButton = $('<span class="info-button"></span>').html(' &#9432');
        let itemButton = $('<button class="item-button"></button>').text(beverage.prisinklmoms + ' SEK');

        let someWrapper = $('<div></div>');
        someWrapper.append(itemName);
        someWrapper.append(infoButton);


        menuItem.append(someWrapper);
        menuItem.append(itemButton);
        menuDiv.append(menuItem);

        itemButton.click(function (){
            add_to_order(beverage);
        });

        infoButton.click(function () {
            show_info_popup(beverage);
        });
    }

$('#order-button').click(function (){
    place_order();
});





});