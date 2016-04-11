var GitHubUser = require('../scripts/github-user.js')
var userData = require('./gitHubUserData.js')

describe('GitHubUser', function () {
  var gitHubUser = new GitHubUser()

  it('be defined', function (done) {
    expect(GitHubUser).toBeDefined()
    done()
  })

  it('be an object', function (done) {
    expect(typeof gitHubUser).toBe('object')
    done()
  })

  describe('when parse GiHub API user data', function () {
    gitHubUser.init(userData)

    it('return a username', function (done) {
      expect(gitHubUser.username()).toBeDefined()
      expect(gitHubUser.username()).toBe('pataruco')
      done()
    })

    it('return an image URL', function (done) {
      expect(gitHubUser.imageUrl()).toBeDefined()
      expect(gitHubUser.imageUrl()).toBe('https://avatars.githubusercontent.com/u/10330222?v=3')
      done()
    })

    it('return name of user', function (done) {
      expect(gitHubUser.name()).toBeDefined()
      expect(gitHubUser.name()).toBe('Pedro Martin')
      done()
    })

    it('return user page URL', function (done) {
      expect(gitHubUser.pageUrl()).toBeDefined()
      expect(gitHubUser.pageUrl()).toBe('https://github.com/pataruco')
      done()
    })
  }) // End of GitHub API user data

  describe('When parse GiHub API user repo language data', function () {
    var languageData = { JavaScript: 162753, CSS: 3595 }
    gitHubUser.addLanguage(languageData)

    it('return a list of languages', function (done) {
      expect(gitHubUser.languages()).toEqual(languageData)
      done()
    })
  })// End of GiHub API user repo language data

  describe('and add another GiHub API user repo language data ', function () {

    it('return a list of languages', function (done) {
      gitHubUser.addLanguage({ JavaScript: 162753, CSS: 3595 })
      gitHubUser.addLanguage({ JavaScript: 129967, CSS: 4703, HTML: 4523 })

      expect(gitHubUser.languages()).toEqual({ JavaScript: 463771, CSS: 309136, HTML: 4523 })
      done()
    })

    it('return an array of language data', function (done) {
      gitHubUser.addLanguage({ JavaScript: 162753, CSS: 3595 })
      gitHubUser.addLanguage({ JavaScript: 129967, CSS: 4703, HTML: 4523 })

      expect(gitHubUser.data()).toContain({ JavaScript: 769312 }, { CSS: 614677 }, { HTML: 310064 })
      done()
    })
  })// End of GiHub API user repo language data
})  // End of GitHubUser
