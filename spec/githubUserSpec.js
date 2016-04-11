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

  it("return an image URL", function (done) {
    expect(gitHubUser.imageUrl()).toBeDefined()
    expect(gitHubUser.imageUrl()).toBe('https://avatars.githubusercontent.com/u/10330222?v=3')
    done()
  })

  it("return name of user", function (done) {
    expect(gitHubUser.name()).toBeDefined()
    expect(gitHubUser.name()).toBe('Pedro Martin')
    done()
  })

  it("return user page URL", function (done) {
    expect(gitHubUser.pageUrl()).toBeDefined()
    expect(gitHubUser.pageUrl()).toBe('https://github.com/pataruco')
    done()
  });
}); // End of GitHub API user data
})  // End of GitHubUser
