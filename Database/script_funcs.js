function load_user_box(user_info){
    $('#user-box-wrapper').show();
    $('#name').html("<b>" + user_info.first_name + " " + user_info.last_name + "</b>");
    $('#status').html("<b>" + credentials_dict[user_info.credentials] + "</b>");
    $('#credit').html("<b>Balance: </b>" + get_balance(user_info) + " SEK");

    if(user_info.credentials < 4){
        $('#deposit-button').show();
    }

}


function deposit_func(){
    alert("TACK");
}