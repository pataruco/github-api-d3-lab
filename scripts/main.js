var settings = {
  async: true,
  crossDomain: true,
  url: '',
  method: 'GET'
}
var gitHubUser = new GitHubUser()
var token = `?access_token=dc7f35532e9aea0ef71e2ab80e77e64d50674c7c`
var username
var renderChartButton = $('#render-chart-button')
var chart = $('#chart')
var pageTwo = $('#page-2')
var pageThree = $('#page-3')
var footer = $('#footer')

$(document).ready(function (){

  $('#get-username').on('submit', function (event) {
    event.preventDefault()
    getUsername()
  renderChartButton.on('click', function (){
    pageThree.toggleClass('on')
    footer.toggleClass('on')
    renderChart()
    scroll(chart)
  })
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
  renderUser()
}

function getLanguageData (repoData) {
  settings.url = `https://api.github.com/repos/${username}/${repoData}/languages${token}`

  $.ajax(settings).done(function (languageData) {
    gitHubUser.addLanguage(languageData)
  })
}

function renderUser () {
  let name = gitHubUser.name()
  $('#user-image').attr('src', gitHubUser.imageUrl()).attr('alt', name )
  $('#user').text(name)
  $('#username').text(gitHubUser.username())
}
