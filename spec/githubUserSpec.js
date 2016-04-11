var GitHubUser = require('../scripts/github-user.js')

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
})  // End of GitHubUser
