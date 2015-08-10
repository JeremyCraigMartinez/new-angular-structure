sudo apt-get update
sudo apt-get upgrade
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
sudo npm install -g npm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh | bash
sudo reboot

nvm install 0.12.7

nvm use 0.12.7

sudo apt-get install git
ssh-keygen -t rsa -b 4096 -C "jeremymartinez11@gmail.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa

sudo apt-get install xclip
#xclip -sel clip < ~/.ssh/id_rsa.pub  - does not work

cat ~/.ssh/id_rsa.pub
#copy id_rsa.pub and paste it in github sshkeys

git clone git@github.com:JeremyCraigMartinez/new-angular-structure.git

cd new-angular-structure/client
npm install

sudo npm install -g bower
sudo npm install -g nodemon
sudo npm install -g grunt-cli
sudo npm install -g yo
sudo npm install -g generator-angular

bower install

#install compass
#sudo su -
#gem install compass -v 0.12.3

#apt-get install ruby-dev
#gem update compass

#exit

sudo apt-get install libfontconfig

cd ~/new-angular-structure/server
mkdir bin
touch bin/www

#paste www ingredients in

#to test
cd ../client
grunt serve

#if memory error, follow instructions here:
# https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-ubuntu-14-04

grunt --force

cd ../server
npm start

#post git pull hook
# grep -ril 'dev.api.wsuhealth.wsu.edu' | xargs sed -i 's/dev.api.wsuhealth.wsu.edu/104.236.169.12/g'