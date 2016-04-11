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

GitHubUser.prototype.addLanguage = function (language) {
  this.languages()

  for (var languageKey in language) {
    for (var languagesKey in this.languageData) {
      if (language.hasOwnProperty(languageKey)) {
        if (this.languageData.hasOwnProperty(languagesKey)) {
          if (Object.keys(this.languageData).indexOf(languageKey) !== -1) {
            this.languageData[languagesKey] += language[languageKey]
          } else {
            this.languageData[languageKey] = language[languageKey]
          }
        }
      }
    }
  }
}

GitHubUser.prototype.data = function () {
  var data = []
  for (var language in this.languageData) {
    if (this.languageData.hasOwnProperty(language)) {
      var object = {}
      object[language] = this.languageData[language]
      data.push(object)
    }
  }
  return data
}
module.exports = GitHubUser
