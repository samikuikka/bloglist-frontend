describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    beforeEach( function() {
      const user = {
        name: 'Superuser',
        username: 'root',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.visit('http://localhost:3000')
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Superuser logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')

      cy.get('html').should('not.contain', 'Superuser logged in')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.get('#username').type('root')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
      })

      it('A blog can be created', function() {
        cy.contains('create new blog').click()
        cy.get('#title').type('The Art of Coding')
        cy.get('#author').type('Loon')
        cy.get('#url').type('http://abcdefghjlk.com')
        cy.get('#create-button').click()

        cy.contains('The Art of Coding')
      })
    })

  })


})