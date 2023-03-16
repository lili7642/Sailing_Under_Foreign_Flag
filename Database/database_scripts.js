function allBeverages_type(type) {

    // Using a local variable to collect the items.
    let collector = [];

    // The DB is stored in the variable DB2, with "spirits" as key element. If you need to select only certain
    // items, you may introduce filter functions in the loop... see the template within comments.
    //
    for (i = 0; i < DB2.spirits.length; i++) {
        if(DB2.spirits[i].varugrupp.includes(type)){
            collector.push(DB2.spirits[i]);
        }
    }
    return collector;
}

function beverageById(id){
    for (i = 0; i < DB2.spirits.length; i++) {
        if(DB2.spirits[i].artikelid === id){
            return DB2.spirits[i];
        }
    }

}

function get_user_details(userName) {
    let userCollect = {};
    let userID;
    let userIndex;

    // Find userid and index
    for (let i = 0; i < DB.users.length; i++) {
        if (DB.users[i].username === userName) {
            userID = DB.users[i].user_id;
            userIndex = i;
            break;
        }
    }

    // put into dict
    userCollect["user_id"] = DB.users[userIndex].user_id;
    userCollect["username"] = DB.users[userIndex].username;
    userCollect["first_name"] = DB.users[userIndex].first_name;
    userCollect["last_name"] = DB.users[userIndex].last_name;
    userCollect["email"] = DB.users[userIndex].email;
    userCollect["credentials"] = DB.users[userIndex].credentials;

    return userCollect;
}



function get_balance(userinfo){
    let account;
    for (let i = 0; i < DB.account.length; i++) {
        if (DB.users[i].username === userinfo.username) {
            account = DB.account[i].creditSEK;
            return account;
        }
    }
}

