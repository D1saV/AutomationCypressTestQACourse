export class LoginPage {
  visit() {
    cy.visit(Cypress.config('baseUrl')); 
  }

  login(email, password) {
    this.visit();
    cy.get('[class="btn btn-outline-white header_signin"]').click();
    cy.get('#signinEmail').type(email);
    cy.get('#signinPassword').type(password, { sensitive: true });
    cy.get('[class="btn btn-primary"]').contains('Login').click();
    cy.wait(3000);
  }
}