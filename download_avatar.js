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
    console.log(element.avatar_url);
  })
});

function downloadImageByURL(url, filePath) {
  fs.createWriteStream(filePath+'/'+url);
}