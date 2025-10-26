
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

Cypress.Commands.add('createExpenseViaApi', (carId, expenseData) => {
    const currentDate = new Date().toISOString().split('T')[0];
    
    const defaultExpenseData = {
        carId: carId,
        reportedAt: currentDate,
        mileage: 1000,
        liters: 50,
        totalCost: 100,
        forceMileage: false
    };

    const finalExpenseData = { ...defaultExpenseData, ...expenseData };

    return cy.request({
        method: 'POST',
        url: '/api/expenses',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: finalExpenseData
    });
});

