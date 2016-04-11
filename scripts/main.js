var settings = {
  async: true,
  crossDomain: true,
  url: '',
  method: 'GET'
}
$(document).ready(function (){
  $('#get-username').on('submit', function (event) {
    getUsername()
  })
})
function getUsername (event){
  username = $('#get-username input[name="username"]').val()
  getUserData(username)
}
function getUserData (username) {
  settings.url = `https://api.github.com/users/${username}${token}`

  $.ajax(settings).done(function (userData) {
    gitHubUser.init(userData)
    getRepoData(username)
  })
}
function getRepoData (username) {
  settings.url = `https://api.github.com/users/${username}/repos${token}`

  $.ajax(settings).done(function (reposData) {
    reposData.forEach(function( repoData ) {
      getLanguageData( repoData.name )
    })
  })
}
