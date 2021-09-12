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

      describe('A few blogs exists', function() {
        beforeEach(function() {

          cy.createNote({ title: 'The Art of Coding', author: 'Tom', url: 'url 1' })
          cy.createNote({ title: 'blog 2', author: 'Brad', url: 'url 2' })
          cy.createNote({ title: 'blog 3', author: 'Alise', url: 'url 3' })
        })

        it('A blog can be liked', function() {

          cy.get('.blogs')
            .contains('The Art of Coding')
            .get('#view-button')
            .click()

          cy.get('.blogs')
            .contains('The Art of Coding')
            .get('#like-button')
            .click()

          cy.get('.blogs')
            .contains('The Art of Coding')
            .get('#likes')
            .contains('1')
        })

        it('A blog can be deleted by user who created it', function() {

          cy.get('.blogs')
            .contains('The Art of Coding')
            .get('#view-button')
            .click()

          cy.get('.blogs')
            .contains('remove')
            .click()

          cy.get('html').should('not.contain', 'The Art of Coding')
        })

        it.only('Blogs shown in order of likes', function() {
          //Like first blog 1 times
          cy.get('.blogs')
            .contains('The Art of Coding')
            .get('#view-button')
            .click()

          cy.get('.blogs')
            .contains('The Art of Coding')
            .get('#like-button')
            .click()

          //Like last blog 2 times
          cy.get('.blogs')
            .contains('blog 3')
            .contains('view')
            .click()

          cy.get('.blogs')
            .contains('url 3')
            .contains('like')
            .click()
            .wait(1000)
            .click()

          cy.wait(1000)

          cy.get('.blogs').get('.blog:first').contains('blog 3')
          cy.get('.blogs').get('.blog:last').contains('blog 2')

        })


      })
    })


  })


})