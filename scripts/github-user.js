var GitHubUser = function () {
  this.userNameData = null
}

GitHubUser.prototype.init = function (userData) {
  this.userNameData = userData
}

GitHubUser.prototype.username = function () {
  return this.userNameData.login
}
module.exports = GitHubUser
