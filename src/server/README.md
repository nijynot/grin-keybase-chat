# Server

## Usage

Install Node.js and npm related
```bash
$ adduser grinchatbot
$ usermod -aG sudo username
$ su - grinchatbot
$ sudo apt update
$ curl --remote-name https://prerelease.keybase.io/keybase_amd64.deb
$ sudo apt install ./keybase_amd64.deb
$ run_keybase -g
$ keybase oneshot -u grinchatbot --paperkey "<your paperkey>"
```

Install Keybase
```bash
$ sudo apt install nodejs
$ sudo apt install npm
$ git clone https://github.com/nijynot/grin-keybase-chat.git
$ cd ./server
$ npm install
$ node server.js
```
