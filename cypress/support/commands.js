
Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    // turn off original log
    options.log = false
    // create our own log with masked message
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    })
  }

  return originalFn(element, text, options)
})


// Cypress.Commands.add('loginQauto', (email, password) => {
//   cy.visit(Cypress.config('baseUrl'))
//   cy.get('[class="btn btn-outline-white header_signin"]').click()
//   cy.get('#signinEmail').type(email)
//   cy.get('#signinPassword').type(password, { sensitive: true })
//   cy.get('[class="btn btn-primary"]').contains('Login').click()
//   cy.wait(3000)
// })

