decipher
========

Given a github pull request number program responds with associated LightHouse ticket number and vice versa 

# Install
* Clone Repo
* run npm install
* add credentials to config.js

```
  Usage: app.js [options]
  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -t, --ticket [number]  Get the las t pull request for the specified ticket
    -p, --pull [number]    Get the Lighthouse Ticket # for the specified pull request
    -c, --checkout         Checkout the branch from pull request

```
ex. node app.js -U feelobot -P pass123 -p 2151
To make this program easier to use setup an alias in your bash_profile like so:
```
alias p2l="node ~/Documents/code/decipher/app.js -p"
alias l2p="node ~/Documents/code/decipher/app.js -t"
```
