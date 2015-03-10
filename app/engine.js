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

var getReply = function(text){
    var matcherCount = matchers.length;
    for (var i = 0; i < matcherCount; i++)
    {
        var matcher = matchers[i];
        var matches = text.match(matcher.regex);
        if (matches)
        {
            return matcher.action(matches[0], text)
        }
    }
}

var process = function (data) {
    console.log(data);
    var text = getReply(data.text);
    return { text: text};
};

var engine = {
    process: process
}

module.exports = engine;

