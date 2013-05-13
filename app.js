var request = require("request");
var program = require('commander');
var GitHubApi = require("github");

var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    timeout: 5000
});

var githubBase = "https://github.com/br/breport/pull/"
var lhBase = "https://bleacherreport.lighthouseapp.com/projects/6296/tickets/"

program
    .version('0.0.1')
    .option('-U, --username [username]', 'Username of Lighthouse or Github Account' )
    .option('-P, --password [password]', 'Password of Lighthouse or Github Account' )
    .option('-t, --ticket [number]', 'Get the last pull request for the specified ticket')
    .option('-p, --pull [number]' , 'Get the Lighthouse Ticket # for the specified pull request')  
    .parse(process.argv);

if (program.ticket) {
    url =  lhBase + program.ticket;
    //var expressionString = "//a[contains(@href,'github.com')]";
    var expressionString = "//a[text()='/github/']/@href"
    var regex = /https:\/\/github.com\/br\/breport\/issues\/([0-9]+)"/
    auth = {
        'auth' : {
            'user' : program.username, 
            'pass' : program.password, 
            'sendImmediately' : true
        }
    };
    request(url, auth, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var pull = body.match(regex)[1];
            console.log(githubBase + pull);
        }
        else console.log(response.statusCode + " Error for " + url)
    })

};
if (program.pull) {
    url = "https://github.com/br/breport/pull/" + program.pull;
    var expressionString = '//a[contains("' + lhBase + '")][last()]';
    var regex = /https:\/\/bleacherreport.lighthouseapp.com\/projects\/6296\/tickets\/([0-9]+)/
    github.authenticate({
        type: "basic",
        username: program.username,
        password: program.password
    });
    auth = {}

    github.pullRequests.get({
            user: "br",
            repo: "breport",
            number: program.pull
        },
        function(err, res) {
            var ticket = res["body"].match(regex)[1]
            console.log(lhBase + ticket);
        }
    );
}


