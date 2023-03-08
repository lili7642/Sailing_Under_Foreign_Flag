
function show_login_popup(){
    // PREFILL THE FORM FOR TESTING
    $('#username').val('jorass');
    $('#password').val('b690bc2447d40ea8a6f78345eb979a28');

    // LOGIN AS USER
    $('#login-button').on("click",function(e) {
        e.preventDefault();
        let username = $('#username').val();
        let password = $('#password').val();
        let found = login_function(username, password);

        if (found){
            // UPDATE LOGGED IN USER
            current_user = get_user_details(username)
            current_balance = get_balance(current_user);

            //LOAD USER INFO DIV
            load_user_box(current_user);

            //LOAD ORDER DIV
            orderTotal = 0;
            $('#menu-item-wrapper').css("height","330px");
            $('#order').show();
            $('#order-total').text('Total: ' + orderTotal.toFixed(2) + ' SEK');
        }else{
            //DONT LOAD PAGE, LOGIN FAILED
            $('#login-message').text('Invalid username or password.').removeClass('success').addClass('error').show();
        }
    });

    // LOGIN AS GUEST
    $('#login_as_guest').on("click",function(){
        //LOAD WEBPAGE IN GUEST MODE, NO ORDERING OR CREDIT
        $('#login-popup').hide();

    });
}

function login_function(username, password){
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

    return found;

}

function logout_function(){
    // hide user stuff
    $('#user-info').hide();
    $('#not-logged-in-wrapper').show();
    $('#order').hide()

    // reset user variables
    current_user = null;
    current_balance = null;

    // clear basket
    $('.order-item').remove();
    $('.comment').remove();
    $('#empty-order-message').show().text("Thank you for your order!");

}

function load_user_box(user_info){
    $('#login-popup').hide();
    $('#not-logged-in-wrapper').hide();
    $('#user-info').show();
    $('#name').html("<b>" + user_info.first_name + " " + user_info.last_name + ", </b>");
    $('#status').html(credentials_dict[user_info.credentials]);
    $('#credit').html("<b>Balance: </b>" + get_balance(user_info) + " SEK");

    if(user_info.credentials < 4){
        $('#deposit-button').show();
    }

}

function show_deposit_popup(){
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
}


function show_info_popup(beverage){
    // showing the info popup and setting the text
    $('#info-popup').show().html(
        '<form>' +
                '<label>'+beverage.namn+'</label>' +
                '<p>'+ beverage.varugrupp +'</p>' +
                '<p>'+ beverage.ursprunglandnamn +'</p>' +
                '<p>Alkoholhalt: '+ beverage.alkoholhalt +'</p>' +
                '<p>Pris: '+ beverage.prisinklmoms +' SEK</p>' +
        '</form>')
        .attr("onclick", "style='display: none;'"); // on click the box disappears
}

//  ------ For some reason it changes every comment ??
function add_comment(beverage, orderItem){
    let comment;
    // clear input field
    $('#comment-input').val($('#' + beverage.artikelid + '-comment').text());

    //show relevant popup
    $('#comment-popup label').text('Add comment to '+beverage.namn + ':');
    $('#comment-popup').show().click(function (e){
        if($(e.target).attr("id") !== "comment-input"){
            $(this).hide();
        }
    });
    // take input from comment field
    $('#comment-popup form').submit(function (e){
        e.preventDefault();
        comment = $('#comment-input').val();
        // add comment div in order
        $('#' + beverage.artikelid + '-comment').text(comment).show();
    });




}



function add_to_order(beverage) {
    // IF BEVERAGE ALREADY IN ORDER, CHANGE THE DIV INSTEAD OF ADDING
    if (beverage.namn in order){
        order[beverage.namn] += 1;
        // put 'amount x price SEK' as price
        $('#' + beverage.artikelid + '-price').html(order[beverage.namn]+" &times "+beverage.prisinklmoms + " SEK");

    // ADD ORDER ITEM DIV
    }else{
        //update order variable
        order[beverage.namn] = 1;

        // hide this message since order no longer empty
        $('#empty-order-message').hide();

        // relevant divs
        let orderDiv = $('#order-item-wrapper');
            // put drink article id as div id
        let orderItem = $('<div class="order-item" id="'+beverage.artikelid +'"></div>');
        let itemName = $('<span class="item-name" id="'+beverage.artikelid+'-name"></span>').text(beverage.namn);
        let itemPrice = $('<span class="item-price" id="'+beverage.artikelid+'-price"></span>').text(beverage.prisinklmoms + ' SEK');
        // comment button div
        let commentButton = $('<span class="comment-button" id="'+beverage.artikelid+'"></span>').html(' &#128172');

        // wrapper for name and comment button
        let someWrapper = $('<div></div>')

        // empty comment div that will be hidden;
        let someComment = $('<div class="comment" id="'+ beverage.artikelid+'-comment"></div>');

        // add the stuff
        someWrapper.append(itemName);
        someWrapper.append(commentButton);
        orderItem.append(someWrapper);
        orderItem.append(itemPrice);
        orderDiv.append(orderItem);
        orderDiv.append(someComment);

        // COMMENT BUTTON FUNCTIONALITY
        commentButton.click(function (){
            add_comment(beverage, orderItem);
        })
    }
    // UPDATE ORDER TOTAL
    orderTotal += parseFloat(beverage.prisinklmoms);
    $('#order-total').text('Total: ' + orderTotal.toFixed(2) + ' SEK');

}

function place_order(){
    // RESET ORDER TOTAL AND ORDER LIST
    let temp_total = orderTotal;
    orderTotal = 0;
    order = {};
    $('#order-total').text('Total: ' + orderTotal.toFixed(2) + ' SEK');

    // REMOVE ITEMS FROM BASKET
    $('.order-item').remove();
    $('.comment').remove();
    // SHOW MESSAGE THAT BASKET IS EMPTY
    $('#empty-order-message').show().text("Thank you for your order!");



    if(current_user.credentials < 4){
        // Pays with credit
        current_balance -= temp_total;
        $('#credit').html("<b>Balance: </b>" + current_balance.toFixed(2) + " SEK");
    }





}