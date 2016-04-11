var GitHubUser = function () {
  this.userNameData = null
}

GitHubUser.prototype.init = function (userData) {
  this.userNameData = userData
}

module.exports = GitHubUser
