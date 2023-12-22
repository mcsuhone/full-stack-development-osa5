describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    cy.request('POST', 'http://localhost:3000/api/users', {
      username: 'testaaja',
      name: 'Teppo',
      password: 'asdasd'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testaaja')
      cy.get('#password').type('asdasd')
      cy.get('#login-button').click()
      cy.contains('testaaja logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testaaja')
      cy.get('#password').type('123123')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testaaja')
      cy.get('#password').type('asdasd')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#toggle-blog-form').click()
      cy.get('#title-input').type('Ruuanlaitto aitoon italian tyyliin')
      cy.get('#author-input').type('Teppo Testaaja')
      cy.get('#url-input').type('http://localhost:/italiablogi')
      cy.get('#blog-form-submit-button').click()
      cy.contains('Ruuanlaitto aitoon italian tyyliin')
    })
  })
})