var Axios = require('axios')
var Inquirer = require('inquirer')
var Keys = require('./keys')
var apiKey = Keys.apiKey

function getUserInput(callback){
  var question = [
    {
      name: 'data',
      type: 'input',
      message: 'What would you like to do next?',
      validate: function(value){
        if(value.length){
          return true;
        }else{
          return 'What would you like to do?';
        }
      }
    }
  ];
Inquirer.prompt(question).then(callback);
}

function getLatestMovies() {
  console.log("Here are the lattest movies");
  console.log("*****************************");
  return Axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=' + apiKey )
  .then(function(data) {
    var movies = data.data.results.map(movie => '* ' + movie.title)
    console.log(movies.join('\n'));
    console.log('\n');
    getUserInput(processInput)
  })
}

function getTopRated(){
  console.log("Here are the most rated movies");
  console.log("*****************************");
  return Axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=' + apiKey )
  .then(function(data) {
    var movies = data.data.results.map(movie => '* ' + movie.title + ' - ' + movie.vote_average)
    console.log(movies.join('\n'));
    console.log('\n');
    getUserInput(processInput)
  })
}

function processInput(obj){
  var data = obj.data.toLowerCase().toString()
  switch (data) {
    case 'latest movies':
      return getLatestMovies()
    case 'top rated':
      return getTopRated()
    case 'help':
       console.log("Here are the commands you can use.\n* 'latest movies' - for all the latest movies\n* 'top rated' - for most rated movies\n\n");
      return getUserInput(processInput)
    default:
       console.log("Invalid input. Here are the commands you can use.\n* 'latest movies' - for all the latest movies\n* 'top rated' - for most rated movies\n\n");
      return getUserInput(processInput)
  }
}

getUserInput(processInput)
