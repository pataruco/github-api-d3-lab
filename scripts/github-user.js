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
module.exports = GitHubUser
