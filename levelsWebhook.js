var request = require('request'),
    fs = require('fs'),
    strftime = require('strftime'),
    Twit =  require('twit');

var prevContent = "";
var obj = JSON.parse(fs.readFileSync('login.json', 'utf8'));

var T = new Twit({
    consumer_key: obj.consumer_key,
    consumer_secret: obj.consumer_secret,
    access_token: obj.access_token,
    access_token_secret:  obj.access_token_secret
})

var stream = T.stream('statuses/filter', { follow: ["783437871961272320"] })

request('https://levels.your-host.xyz/[REDACTED]', function (error, response, body) { // no peeking at this link
    if (!error && response.statusCode == 200) {
        //console.log(body);
        prevContent = body.substr(0);
    }
});

request('https://levels.your-host.xyz/', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        //console.log(body);
        prevContent = body.substr(0);
        fs.writeFile(`./levels-logs/${strftime('%F - %H-%M-%S')}.html`, prevContent, (err) => {
            if (err) throw err;
        console.log('It\'s saved!');
    });
    }
});

setInterval(function() {
    //console.log('time')
    request('https://levels.your-host.xyz', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            if (body != prevContent) {
                sendWebhook(obj.idLCCS, obj.authLCCS, '{"username":"Levels Website", "avatar_url": "http://i.imgur.com/14iAwQ1.jpg", "content":"The front page has updated! https://levels.your-host.xyz - Compare revisions here: https://www.dropbox.com/sh/9cuddweksi8bo85/AAAGMIuIQbOayc5wbtDxCAkxa?dl=0"}');
                sendWebhook(obj.idGD, obj.authGD, '{"username":"Levels Website", "avatar_url": "http://i.imgur.com/14iAwQ1.jpg", "content":"The front page has updated! https://levels.your-host.xyz - Compare revisions here: https://www.dropbox.com/sh/9cuddweksi8bo85/AAAGMIuIQbOayc5wbtDxCAkxa?dl=0"}');
                sendWebhook(obj.idLC, obj.authLC, '{"username":"Levels Website", "avatar_url": "http://i.imgur.com/14iAwQ1.jpg", "content":"The front page has updated! https://levels.your-host.xyz - Compare revisions here: https://www.dropbox.com/sh/9cuddweksi8bo85/AAAGMIuIQbOayc5wbtDxCAkxa?dl=0"}');
                T.post('statuses/update', { status: 'The front page has updated! https://levels.your-host.xyz - Compare revisions here: https://www.dropbox.com/sh/9cuddweksi8bo85/AAAGMIuIQbOayc5wbtDxCAkxa?dl=0' }, function(err, data, response) {})
                prevContent = body.substr(0);
                fs.writeFile(`./levels-logs/${strftime('%F - %H-%M-%S')}.html`, prevContent, (err) => {
                    if (err) throw err;
                console.log('It\'s saved!');
            });
            }
        }
    });
}, 10 * 60 * 1000)

setInterval(function() {
    //console.log('time')
    request('https://levels.your-host.xyz/[REDACTED]', function (error, response, body) { //no peeking at this link
        if (!error && response.statusCode == 200) {
            if (body != prevContent) {
                sendWebhook(obj.idLCCS, obj.authLCCS, '{"username":"Levels Website", "avatar_url": "http://i.imgur.com/14iAwQ1.jpg", "content":"The challenge page has updated! https://levels.your-host.xyz/REDACTED."}');
                sendWebhook(obj.idGD, obj.authGD, '{"username":"Levels Website", "avatar_url": "http://i.imgur.com/14iAwQ1.jpg", "content":"The challenge page has updated! https://levels.your-host.xyz/REDACTED."}');
                sendWebhook(obj.idLC, obj.authLC, '{"username":"Levels Website", "avatar_url": "http://i.imgur.com/14iAwQ1.jpg", "content":"The challenge page has updated! https://levels.your-host.xyz/REDACTED."}');
                T.post('statuses/update', { status: 'The challenge page has updated! https://levels.your-host.xyz/REDACTED.' }, function(err, data, response) {})
                prevContent = body.substr(0);
            }
        }
    });
}, 10 * 60 * 1000)



stream.on('tweet', function (tweet) {
    webhookData = JSON.stringify({"username":"Levels Twitter","avatar_url":"http://i.imgur.com/tOPVYgt.png","content":"New tweet detected!","embeds": [{"title":"@" + tweet.user.screen_name,"description":tweet.text,"url": `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`}]});
    sendWebhook(obj.idLCCS, obj.authLCCS, webhookData);
    sendWebhook(obj.idGD, obj.authGD, webhookData);
    sendWebhook(obj.idLC, obj.authLC, webhookData);
})

function sendWebhook(clan, auth, body) {
    request.post({
        headers: {'Content-Type': 'application/json'},
        url: `https://canary.discordapp.com/api/webhooks/${clan}/${auth}`,
        body: body
    }, function(error, response, body){
        //console.log(body);
    });
}
