var request = require("request");
var program = require('commander');
var GitHubApi = require("github");
var sys = require('sys');
var exec = require('child_process').exec;
var config = require('./config')

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
    .option('-t, --ticket [number]', 'Get the las t pull request for the specified ticket')
    .option('-p, --pull [number]' , 'Get the Lighthouse Ticket # for the specified pull request')  
    .option('-c, --checkout', 'Checkout the branch from pull request')
    .parse(process.argv);

if (program.ticket) {
    url =  lhBase + program.ticket;
    var regex = /https:\/\/github.com\/br\/breport\/issues\/([0-9]+)/g
    auth = {
        'auth' : {
            'user' : config.lighthouse_username, 
            'pass' : config.lighthouse_pass, 
            'sendImmediately' : true
        }
    };
    request(url, auth, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var pull = body.match(regex).pop();
            console.log(pull);
            function puts(error, stdout, stderr) { sys.puts(stdout) }
            exec("open " + pull, puts);
            var pullNumber = pull.slice(-4);
        }
        else console.log(response.statusCode + " Error for " + url)
        github.authenticate({
            type: "basic",
            username: config.github_username,
            password: config.github_pass
        });

        github.pullRequests.get({
                user: "br",
                repo: "breport",
                number: pullNumber
            },
            function(err, res) {
                var branch = res["base"]["ref"]//["master_branch"]
                console.log(branch)
                if (program.checkout) {
                    function puts(error, stdout, stderr) { sys.puts(stdout) }
                    exec("git co " + branch, puts);
                    exec("git pull origin  " + branch, puts);
                }
            }
        );
    });
    
};
if (program.pull) {
    var regex = /https:\/\/bleacherreport.lighthouseapp.com\/projects\/6296\/tickets\/([0-9]+)/
    github.authenticate({
        type: "basic",
        username: github_username,
        password: github_pass
    });

    github.pullRequests.get({
            user: "br",
            repo: "breport",
            number: program.pull
        },
        function(err, res) {
            var ticket = res["body"].match(regex)[1]
            console.log(lhBase + ticket);
            function puts(error, stdout, stderr) { sys.puts(stdout) }
            exec("open " + lhBase + ticket, puts);
        }
    );
}


