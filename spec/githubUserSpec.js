var GitHubUser = require('../scripts/github-user.js')
var GitHubUser = require('../scripts/github-user.js'),
      userData = require('./gitHubUserData.js')

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

  describe("when parse GiHub API user data", function () {
  gitHubUser.init(userData)

  it("return a username", function (done) {
    expect(gitHubUser.username()).toBeDefined()
    expect(gitHubUser.username()).toBe('pataruco')
    done()
  })
})  // End of GitHubUser
