function load_user_box(user_info){
    $('#user-box-wrapper').show();
    $('#show-name').html("<b>" + user_info.first_name + " " + user_info.last_name + "</b>");
    $('#show-account').html("<b>Balance: </b>" + user_info.account + " SEK");
    $('#show-cred').html("<b>Credentials: </b>" + user_info.credentials);

    if(user_info.credentials < 4){
        $('#deposit-button').show().attr("onclick", "deposit_func()");
    }

}


function deposit_func(){
    alert("TACK");
}