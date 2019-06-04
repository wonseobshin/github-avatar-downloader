var request = require('request');
var token = require('./secrets');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url : "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers : {
      'User-Agent' : 'request',
      'Authorization' : token.GITHUB_TOKEN,
    }
  };


  request(options, function(err, res, body) {
    cb(err, body);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  JSON.parse(result).forEach(function(element){
    var path = './avatar/'+element.login+'.jpg';

    console.log(path);
    downloadImageByURL(element.avatar_url, path)
  })
});

function downloadImageByURL(url, filePath) {
  var avatar = fs.createWriteStream(filePath);
  var req = request(url);

  req.on('error', function (err) {
       throw err;
     })
     .on('response', function (response) {
       console.log('Response Status Code:', response.statusCode,
                    'Content Type:', response.headers['content-type']);
     })
     .pipe(avatar);
}