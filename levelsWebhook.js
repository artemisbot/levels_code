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

request('https://levels.your-host.xyz', function (error, response, body) {
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
                sendWebhook(obj.clanLCCS, obj.authLCCS);
                sendWebhook(obj.clanGD, obj.authGD);
                T.post('statuses/update', { status: 'The website has updated! https://levels.your-host.xyz - Compare revisions here: https://www.dropbox.com/sh/9cuddweksi8bo85/AAAGMIuIQbOayc5wbtDxCAkxa?dl=0' }, function(err, data, response) {})
                prevContent = body.substr(0);
                fs.writeFile(`./levels-logs/${strftime('%F - %H-%M-%S')}.html`, prevContent, (err) => {
                    if (err) throw err;
                console.log('It\'s saved!');
            });
            }
        }
    });
}, 10 * 60 * 1000)

function sendWebhook(clan, auth) {
    request.post({
        headers: {'Content-Type': 'application/json'},
        url: `https://canary.discordapp.com/api/webhooks/${clan}/${auth}`,
        body: '{"username":"Levels Website", "avatar_url": "http://i.imgur.com/14iAwQ1.jpg", "content":"The website has updated! https://levels.your-host.xyz - Compare revisions here: https://www.dropbox.com/sh/9cuddweksi8bo85/AAAGMIuIQbOayc5wbtDxCAkxa?dl=0"}'
    }, function(error, response, body){
        //console.log(body);
    });
}
