

$(document).ready(function() {

    //prefill form as default
    $('#username').val('jorass');
    $('#password').val('b690bc2447d40ea8a6f78345eb979a28');

    let current_user;
    let current_balance;

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
            $('#login-message').text("Login successful!").removeClass('error').addClass('success').show();
            $('#login-message').click(function(){$(this).hide()});
            $('#login_form').hide();
            $('#menu').show();
            $('#order').show();
            current_user = get_user_details(username)
            current_balance = get_balance(current_user);
            load_user_box(current_user);
        }else{
            $('#login-message').text('Invalid username or password.').removeClass('success').addClass('error').show();
        }

    });

    // LOGIN AS GUEST
    $('#login_as_guest').click(function(){
        $('#login-message').text("Logged in as guest!").removeClass('error').addClass('success').show();
        $('#login_form').hide();
        $('#menu').show();
        $('#order').show();
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



    let menuDiv = $('#menu');
    let orderDiv = $('#order');
    let orderTotal = 0;


    // Load the menu
    for (let beverage of beers) {
        let menuItem = $('<div class="menu-item" draggable="true"></div>');
        let itemName = $('<span class="item-name"></span>').text(beverage.namn);
        let itemButton = $('<button class="item-button"></button>').text(beverage.prisinklmoms + ' SEK');


        menuItem.append(itemName);
        menuItem.append(itemButton);
        menuDiv.append(menuItem);

        itemButton.click(function (){
            addToOrder(beverage);
        });
    }



    let order = {};
    function addToOrder(beverage) {
        let orderItem = $('<div class="order-item"></div>');
        let itemName = $('<span class="item-name"></span>').text(beverage.namn);
        let itemPrice = $('<span class="item-price"></span>').text(beverage.prisinklmoms + ' SEK');



        // row below is CHAT GPT magic
        let existingItem = orderDiv.find('.item-name:contains("'+beverage.namn+'")').first().parent('.order-item');

        if (beverage.namn in order){
            order[beverage.namn] += 1;
            existingItem.find('.item-name').text(beverage.namn + " x" + order[beverage.namn]);
            existingItem.find('.item-price').text(beverage.prisinklmoms);

        }else{
            order[beverage.namn] = 1;
            orderItem.append(itemName);
            orderItem.append(itemPrice);


            orderDiv.append(orderItem);
        }
        orderTotal += parseFloat(beverage.prisinklmoms);
        $('#order-total').text('Total: ' + orderTotal.toFixed(2) + ' SEK');

    }


    $(function(){
        orderDiv.droppable();
    });
});