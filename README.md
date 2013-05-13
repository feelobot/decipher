decipher
========

Given a github pull request number program responds with associated LightHouse ticket number and vice versa 

# Install
* Clone Repo
* run npm install

```
  Options:

    -h, --help                 output usage information
    -V, --version              output the version number
    -U, --username [username]  Username of Lighthouse or Github Account
    -P, --password [password]  Password of Lighthouse or Github Account
    -t, --ticket [number]      Get the last pull request for the specified ticket
    -p, --pull [number]        Get the Lighthouse Ticket # for the specified pull request
```
ex. node app.js -U feelobot -P pass123 -p 2151
To make this program easier to use setup an alias in your bash_profile like so:
```
alias p2l="node ~/Documents/code/decipher/app.js -U feelobot -P pass123 -p"
alias l2p="node ~/Documents/code/decipher/app.js -U frodriguez@bleacherreport.com -P pass123 -t"
```
Note: for p2l you need to use your github credentials, for l2p you need to use your lighthouse credentials.

# Todo:
* Copy url to clipboard to paste into browser easily
