describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    cy.request('POST', 'http://localhost:3000/api/users', {
      username: 'testaaja',
      name: 'Teppo',
      password: 'asdasd'
    })
    cy.request('POST', 'http://localhost:3000/api/users', {
      username: 'testaaja2',
      name: 'Matti',
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

  describe('When logged in and created post', function() {
    beforeEach(function() {
      // Login
      cy.get('#username').type('testaaja')
      cy.get('#password').type('asdasd')
      cy.get('#login-button').click()

      // Create post
      cy.get('#toggle-blog-form').click()
      cy.get('#title-input').type('Ruuanlaitto aitoon italian tyyliin')
      cy.get('#author-input').type('Teppo Testaaja')
      cy.get('#url-input').type('http://localhost/italiablogi')
      cy.get('#blog-form-submit-button').click()
    })

    it('A blog can be liked', function() {
      cy.get('#view-blog-button').click()
      cy.contains('likes 0')
      cy.get('#like-blog-button').click()
      cy.contains('likes 1')
    })

    it('A blog can be removed', function() {
      cy.get('#view-blog-button').click()
      cy.get('#remove-blog-button').click()
      cy.contains('Ruuanlaitto aitoon italian tyyliin').should('not.exist')
    })

    it('Only user who created blog can delete it', function() {
      // Logout
      cy.get('#logout-button').click()
      // Login as Matti
      cy.get('#username').type('testaaja2')
      cy.get('#password').type('asdasd')
      cy.get('#login-button').click()

      cy.get('#view-blog-button').click()
      cy.contains('remove').should('not.exist')
    })
  })
})