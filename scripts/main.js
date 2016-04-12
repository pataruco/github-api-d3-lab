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
    pageTwo.toggleClass('on')
    getUsername()
    scroll($('#page-2'))
  })

  renderChartButton.on('click', function (){
    pageThree.toggleClass('on')
    footer.toggleClass('on')
    renderChart()
    scroll(chart)
  })

  $('#button-top').on('click', function () {
    gitHubUser.languageData = { JavaScript: 0 }
    setTimeout(function(){
      pageTwo.toggleClass('on')
      pageThree.toggleClass('on')
      footer.toggleClass('on')
    }, 2000)
  })
})

function scroll(to){
  $('html, body').animate({
      scrollTop: to.offset().top
  }, 2000)
}

function getUsername (event){
  chart.empty()

  username = $('#get-username input[name="username"]').val()
  getUserData(username)
}

function getUserData (username) {
  settings.url = `https://api.github.com/users/${username}${token}`

  $.ajax(settings).done(function (userData) {
  $.ajax(settings).fail(function(error){
    renderUserError(error)
  }).done(function (userData) {
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

function renderChart () {
  let data = gitHubUser.data(),
      w = 400,
      h = 400,
      r = 180,
      inner = 70

  let color = d3.scale
              .ordinal()
              .range(['#081d58', '#253494', '#225ea8', '#1d91c0', '#41b6c4', '#7fcdbb', '#c7e9b4', '#edf8b1', '#ffffd9'])

  let total = sumData(data)

  let vis = d3.select('#chart')
            .append('svg:svg')
            .data([data])
            .attr('width', w)
            .attr('height', h)
            .append('svg:g')
            .attr('transform', `translate(${r * 1.1}, ${r * 1.1})`)

  let textTop = vis.append('text')
                .attr('dy', '.35em')
                .style('text-anchor', 'middle')
                .attr('class', 'textTop')
                .attr('y', -10)

  let textBottom = vis.append('text')
                  .attr('dy', '.35em')
                  .style('text-anchor', 'middle')
                  .attr('class', 'textBottom')
                  .attr('y', 10)

  let arc = d3.svg.arc()
            .innerRadius(inner)
            .outerRadius(r)

  let arcOver = d3.svg.arc()
                .innerRadius(inner + 10)
                .outerRadius(r + 10)

  let pie = d3.layout.pie()
            .value(
              function(d){
                for (let key in d) {
                  if (d.hasOwnProperty(key)) {
                    return d[key]
                  }
                }
              })

  let arcs = vis.selectAll('g.slice')
            .data(pie)
            .enter()
            .append('svg:g')
            .attr('class', 'slice')
            .on('mouseover', function(d) {
              d3.select(this).select('path')
                .transition()
                .duration(200)
                .attr('d', arcOver)

              let key = Object.keys(d3.select(this).datum().data)[0]
              let value = (((d3.select(this).datum().data[key]) * 100) / total).toFixed(2)

              textTop.text(key).attr('y', -10)
              textBottom.text(`${value}%`).attr('y', 10)
            })
            .on('mouseout', function(d) {
                d3.select(this).select('path')
                .transition()
                .duration(100)
                .attr('d', arc)
                textTop.text('')
                textBottom.text('')
            })

  arcs.append('svg:path')
      .attr('fill', function(d, i) {
        return color(i)
      })
      .attr('d', arc)

  let legend = d3.select('#chart').append('svg')
              .attr('class', 'legend')
              .attr('width', r)
              .attr('height', r * 2)
              .selectAll('g')
              .data(data)
              .enter().append('g')
              .attr('transform', function(d, i) {
                return `translate(0, ${i * 20})`
              })

  legend.append('rect')
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', function(d, i) {
        return color(i)
      })

  legend.append('text')
      .attr('x', 24)
      .attr('y', 9)
      .attr('dy', '.35em')
      .text(function(d) {
        let key = Object.keys(d)[0]
        return key
      })
}

function sumData (data) {
  let values = []
  data.forEach(function(dataSet){
    for (var key in dataSet) {
      if (dataSet.hasOwnProperty(key)) {
        values.push(dataSet[key])
      }
    }
  })
  return d3.sum(values)
}

$('a[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
    var target = $(this.hash)
    target = target.length ? target : $('[name=' + this.hash.slice(1) +']')
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000)
      return false
    }
  }
})
