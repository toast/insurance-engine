var paths = [];

var getPathForUser = function(userId){
    return paths[userId];
}

var setPathForUser = function(userId, path){
    paths[userId] = path;
    console.log(paths);
}

var handleCar = function(matchedText, wholeText){
    return "Your car insurance for Reg Number " + matchedText + " will add £80 per month";
}

var handleHouse = function(matchedText, wholeText){
    return "Are you looking for house insurence for postcode: " + matchedText + "?";
}

var handleBike = function(matchedText, wholeText){
    return "Your bike insurance will add £25";
}

var handlePet = function(matchedText, wholeText){
        return "Pet insurance will add a monthly fee of " + matchedText + "£25";
};

var handleGadget = function(matchedText, wholeText){
        return "Gadget insurance for your " + matchedText + " is £2.99 per month";
};

var handleBody = function(matchedText, wholeText){
        return "Body parts insurance for your " + matchedText + " is £150,000.00";
};

var handleHelp = function(matchedText, fullText){
    return "Although we do not insure " + fullText.replace('@plsinsure', '').trim() + " at the moment - we hope to bring you this cover soon";
};

var handleCity = function(matchedText, fullText){
    return "You want to insure " + matchedText + " - if you need to ask you can't afford it.";
}

var matchers = [
    {regex:/(\w{2,2}\d{2,2}(?:| )\w{3,3})/i, action: handleCar},
    {regex:/(\w{2,2}\d{1,2}(?:| )\d{1,1}\w{2,2})/i, action: handleHouse},
    {regex:/(house|home|contents|building)/i, action: handleHouse},
    {regex:/(cat|dog|fish|snake|gerbil|rat|reptile)/i, action: handlePet},
    {regex:/(iPad|iPhone|camera|canon|nikon|samsung)/i, action: handleGadget},
    {regex:/(legs|fingers|head|lips|eyes|nose|teeth)/i, action: handleBody},
    {regex:/(london|paris|new york|los angeles|berlin|tokyo)/i, action: handleCity},
    {regex:/(bike|bicycle|marin|boardman|brompton|specialized|dawes|raleigh)/i, action: handleBike},
    {regex:/(.+)/i, action: handleHelp}
]

var nicksResponse = function(chat, path, userId){
    var bot = '';

    if(path !== '') {
        if(path === 'gadget'){
            if(/^y|yes|okay|sure$/i.test(chat)){ bot = "Cool, you bought gadget insurance at: 4.99/month. What next?"; path = '';}
            else if(/^no|negative|nope|nah$/i.test(chat)){ bot = "Oh okay, just let me know what type of insurance you're after when you're ready..."; path = '';}
            else { bot = "I didn't understand that...did you want gadget insurance? Please say yes or no...";}
        }
        if(path === 'home'){
            if(/\d+/i.test(chat)){ bot = "Thanks, looks like you're all set, fetching a quote..."; path = '';}
            else if(/^no|negative|nope|nah$/i.test(chat)){ bot = "Oh okay...sad times!...Just let me know what type of insurance you're after when you're ready..."; path = '';}
            else { bot = "I didn't understand that...did you want home insurance? Please say yes or no...";}
        }
        if(path === 'bike'){
            if(/^y|yes|okay$/i.test(chat)){ bot = "Cool, you bought bike insurance at: 9.99/month. What next?"; path = '';}
            else if(/^no|negative|nope|nah$/i.test(chat)){ bot = "Cool, you bought gadget insurance at: 4.99/month"; path = ''}
            else { bot = "I didn't understand that...did you want bike insurance? Please say yes or no...";}
        }
        if(path === 'pet'){
            if(/^y|yes|okay$/i.test(chat)){ bot = "Cool, you bought pet insurance at: 6.99/month. What next?"; path = '';}
            else if(/^no|negative|nope|nah$/i.test(chat)){ bot = "Cool, your premuim will remain the same"; path = ''}
            else { bot = "I didn't understand that...did you want pet insurance? Please say yes or no...";}
        }
        else if(path === 'facebook'){
            if(/^y|yes|okay$/i.test(chat)){ document.location = 'https://facebook.com'; path = '';}
            else if(/^no|negative|nope|nah$/i.test(chat)){ bot = "No worries, let's do it the traditional way :)"; path = ''}
            else { bot = "I didn't understand that...did you want to connect to facebook? Please say yes or no...";}
        }
//                else {
//                    bot = "Hmm...I've gotten confused...let's start again...";
//                    path = '';
//                }
    } else {
        if(/hi|hello|alfred/i.test(chat)){ bot = "Enough with the pleasantries...let's get down to business! What insurance are you after?"; }
        if(/phone|mobile|gadget|iPad|Android/i.test(chat)){ bot = "Okay, our gadget insurance starts at 4.99/month, want to add it to your bill?"; path = 'gadget'; }
        if(/bike/i.test(chat)){ bot = "Okay, our bike insurance starts at 9.99/month, want to add it to your bill?"; path = 'bike' }
        if(/(cat|dog|fish|snake|gerbil|rat|reptile)/i.test(chat)){ bot = "Okay, our pet insurance starts at 6.99/month, want to add it to your bill?"; path = 'pet' }
        if(/home/i.test(chat)){ bot = "Okay, here's a quick way to get home insurance: http://www.alfredhomeinsurance.com, or tell me the size of your home in square feet."; path='home'; }
        if(/car|boat|^pi$|^pl$|professional indemnity|professional liability/i.test(chat)){ bot = "I'm afraid we only offer: home, gadget, and bike insurance at the moment."; }
        if(/\d+/i.test(chat)){ bot += "Fancy numbers! Are you an actuary or something?"; }
        if(/facebook/i.test(chat)){ bot = "Connect to facebook to fast track past some questions?"; path = 'facebook'}
    }

    if(bot === ""){
        bot = "Whaa?!? Is that insurance speak?";
    }

    setPathForUser(userId, path);
    return { text: bot, type: 'message'};
}

var process = function(data){
    var userId = data.userId;
    console.log(data.userId);
    var text = data.text;

    if (!getPathForUser(userId)){
        setPathForUser(userId, '');
    }
    return nicksResponse(text, getPathForUser(userId), userId);
//    var matcherCount = matchers.length;
//    for (var i = 0; i < matcherCount; i++)
//    {
//        var matcher = matchers[i];
//        var matches = text.match(matcher.regex);
//        if (matches)
//        {
//            return matcher.action(matches[0], text)
//        }
//    }
}

var engine = {
    process: process
}

module.exports = engine;

