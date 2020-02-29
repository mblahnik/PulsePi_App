const path = require('path');

const fs = require('fs');

const directoryPath = path.join(__dirname, 'assets/img/avatars');

console.log(directoryPath);

fs.readdir(directoryPath, function(err, files) {
  files.forEach(x => console.log(x));
});

$('avatarChange').click(function() {});
