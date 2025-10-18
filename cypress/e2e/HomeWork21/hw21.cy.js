describe('Login tests for QAuto', () => {
    beforeEach(() => {
        cy.loginQauto(Cypress.env('EMAIL'), Cypress.env('PASSWORD'))
        
    })
    
    it('should display all UI elements correctly', () => {
        cy.contains('button', 'Add car').should('be.visible').click();
        cy.get('.modal-content').should('be.visible');
        cy.get('.modal-title').should('contain', 'Add a car')
        cy.get('label[for="addCarBrand"]').should('contain', 'Brand')
        cy.get('label[for="addCarModel"]').should('contain', 'Model')
        cy.get('label[for="addCarMileage"]').should('contain', 'Mileage')
        cy.get('#addCarBrand').should('be.visible').and('have.class', 'form-control')
        cy.get('#addCarModel').should('be.visible').and('have.class', 'form-control')

        cy.get('#addCarMileage')
        .should('be.visible')
        .and('have.attr', 'type', 'number')
        .and('have.class', 'form-control') 

        cy.get('.input-group-text').should('contain', 'km')

        cy.contains('button', 'Cancel')
        .should('be.visible')
        .and('have.class', 'btn-secondary')

        cy.get('.modal-content')
        .contains('button', 'Add')
        .should('be.visible')
        .and('have.class', 'btn-primary')
        .should('have.prop', 'disabled', true)
    })

    it('should allow valid input and enable the Add button', () => {
        cy.get('.modal-content').should('be.visible');
        cy.get('#addCarBrand').click().select('BMW')
        cy.get('#addCarModel').select('X5')
        cy.get('#addCarMileage').type('25000')

        cy.contains('button', 'Add')
        .should('not.be.disabled')
        .click();

        cy.contains('.car-item', 'BMW X5')
        .should('exist')
        .and('contain', '25000')
    })
});