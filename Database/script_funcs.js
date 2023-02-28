function load_user_box(user_info){
    $('#user-box-wrapper').show();
    $('#name').html("<b>" + user_info.first_name + " " + user_info.last_name + "</b>");
    $('#status').html("<b>" + credentials_dict[user_info.credentials] + "</b>");
    $('#credit').html("<b>Balance: </b>" + get_balance(user_info) + " SEK");

    if(user_info.credentials < 4){
        $('#deposit-button').show();
    }

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


function add_to_order(beverage) {
    // relevant divs
    let orderDiv = $('#order-item-wrapper');
    let orderItem = $('<div class="order-item"></div>');
    let itemName = $('<span class="item-name"></span>').text(beverage.namn);
    let itemPrice = $('<span class="item-price"></span>').text(beverage.prisinklmoms + ' SEK');

    // hide this message since order no longer empty
    $('#empty-order-message').hide();

    // row below is CHAT GPT magic
    let existingItem = orderDiv.find('.item-name:contains("'+beverage.namn+'")').first().parent('.order-item');

    // IF BEVERAGE ALREADY IN ORDER, CHANGE THE DIV INSTEAD OF ADDING
    if (beverage.namn in order){
        order[beverage.namn] += 1;
        existingItem.find('.item-name').text(beverage.namn + " x" + order[beverage.namn]);
        existingItem.find('.item-price').text(beverage.prisinklmoms + " SEK");

    // ADD ORDER ITEM DIV
    }else{
        order[beverage.namn] = 1;
        orderItem.append(itemName);
        orderItem.append(itemPrice);
        orderDiv.append(orderItem);
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
    // SHOW MESSAGE THAT BASKET IS EMPTY
    $('#empty-order-message').show();



    if(current_user.credentials < 4){
        // Pays with credit
        current_balance -= temp_total;
        $('#credit').html("<b>Balance: </b>" + current_balance.toFixed(2) + " SEK");
    }






}