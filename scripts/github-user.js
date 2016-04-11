var GitHubUser = function () {
  this.userNameData = null
}

GitHubUser.prototype.init = function (userData) {
  this.userNameData = userData
}

GitHubUser.prototype.username = function () {
  return this.userNameData.login
}

GitHubUser.prototype.imageUrl = function () {
  return this.userNameData.avatar_url
}

GitHubUser.prototype.name = function () {
  return this.userNameData.name
}

GitHubUser.prototype.pageUrl = function () {
  return this.userNameData.html_url
}

GitHubUser.prototype.languages = function () {
  return this.languageData = this.languageData || { JavaScript: 0 }
}

module.exports = GitHubUser
