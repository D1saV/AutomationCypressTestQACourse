describe('Garage tests', () => {
    beforeEach(() => {
        cy.loginQauto(Cypress.env('EMAIL'), Cypress.env('PASSWORD'))
        
    })
    
    it('should display all UI elements correctly', () => {
        cy.contains('button', 'Add car').should('be.visible').click();
        cy.get('.modal-content').should('be.visible')
        cy.get('.modal-title').should('contain', 'Add a car')
        cy.get('button.close')
            .should('exist')
            .and('be.visible');
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

    it('should modal window is open-close', () => {
        cy.contains('button', 'Add car').click();
        cy.get('.modal-content').should('be.visible')
        cy.get('button.close').click()
        cy.get('.modal-content').should('not.visible')
        cy.contains('button', 'Add car').click();
        cy.get('.modal-content').should('be.visible')
    })

    it('should allow valid input and enable the Add button', () => {
        cy.contains('button', 'Add car').should('be.visible').click();
        cy.get('.modal-content').should('be.visible');
        cy.get('#addCarBrand').select('BMW')
        cy.get('#addCarModel').select('X5')
        cy.get('#addCarMileage').type('25000')
        cy.get('#addCarMileage')
            .type('{uparrow}')

        cy.get('.modal-content')
            .contains('button', 'Add')
            .should('not.be.disabled')
            .click();

        cy.contains('.car-item', 'BMW X5', '25001')
    })

    it('should display all elements for a new car in the garage', () => {
        cy.get('.car-list').should('be.visible');
        cy.get('.car-item').should('exist').and('be.visible');

        cy.get('.car-item').first().within(() => {
        cy.get('.car-logo').should('be.visible');
        cy.get('.car_name').should('contain', 'BMW X5');
        cy.get('.car_actions').should('be.visible');
        cy.get('.car-body').should('be.visible');
        });

        cy.get('.car_actions').first().within(() => {
            cy.get('.car_edit').should('be.visible');
            cy.contains('button', 'Add fuel expense').should('be.visible');
        });

        cy.get('.car-body').first().within(() => {
            cy.get('.car_update-mileage')
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                const today = new Date();
                const formatted = today.toLocaleDateString('uk-UA', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                });
                expect(text.trim()).to.match(
                new RegExp(`^Update mileage\\s*•\\s*${formatted}$`)
                );
            });

        cy.get('form.update-mileage-form')
            .should('be.visible')
            .and('have.attr', 'novalidate');

        cy.get('.update-mileage-form_icon')
            .should('be.visible')
            .and('have.class', 'icon-tachometer');

        cy.get('input[name="miles"]')
            .should('be.visible')
            .and('have.attr', 'type', 'number')
            .and('have.class', 'form-control');

        cy.get('button.update-mileage-form_submit')
            .should('be.visible')
            .and('have.class', 'btn')
            .and('have.class', 'btn-secondary')
            .and('have.class', 'btn-sm')
            .and('be.disabled');

        cy.get('input[name="miles"]').clear().type('26300');

        cy.get('button.update-mileage-form_submit')
            .should('be.enabled')
            .click();

        cy.get('button.update-mileage-form_submit')
            .should('be.disabled');

        cy.contains('.car-item', 'BMW X5', '26300')
  });

  it('should display all UI elements correctly on the edit mode', () => {
        cy.get('.car-item').first(() => {
        cy.get('.car_edit').click()    
        })
        cy.get('.modal-content').should('be.visible');

        cy.get('.modal-header').within(() => {
        cy.get('.modal-title').should('have.text', 'Edit a car');
        cy.get('button.close')
            .should('be.visible')
            .and('have.attr', 'aria-label', 'Close')
            .find('span')
            .should('contain', '×');
    });
        cy.get('label[for="addCarBrand"]').should('have.text', 'Brand');
        cy.get('#addCarBrand')
            .should('be.visible')
            .and('have.class', 'form-control')
            .within(() => {
        cy.get('option').should('have.length.at.least', 5);
        cy.get('option').first().should('contain', 'Audi');
        cy.get('option').eq(1).should('contain', 'BMW');
      });
        cy.get('label[for="addCarModel"]').should('have.text', 'Model');
        cy.get('#addCarModel')
            .should('be.visible')
            .within(() => {
        cy.get('option').should('have.length.at.least', 5);
        cy.get('option').last().should('contain', 'Z3');
      });
        cy.get('label[for="addCarMileage"]').should('contain', 'Mileage');
        cy.get('#addCarMileage')
            .should('have.attr', 'type', 'number')
            .and('be.visible');
        cy.get('.input-group-append .input-group-text').should('contain', 'km');
        cy.get('label[for="carCreationDate"]').should('contain', 'Created at date');
        cy.get('#carCreationDate')
            .should('be.visible')
            .and('have.attr', 'type', 'text');
        cy.get('.btn.date-picker-toggle .icon-calendar').should('be.visible');
        cy.get('.modal-footer').within(() => {
        cy.contains('button', 'Remove car')
            .should('be.visible')
            .and('have.class', 'btn-outline-danger');
        cy.contains('button', 'Cancel')
            .should('be.visible')
            .and('have.class', 'btn-secondary');
        cy.contains('button', 'Save')
            .should('be.visible')
            .and('have.class', 'btn-primary')
            .and('be.disabled');
    });
        cy.get('form .form-group').should('have.length', 4);
        cy.get('form .form-group label').each(($label) => {
        cy.wrap($label).should('not.be.empty');
    });


   })

   it('should remove the car from garage', () => {
        cy.contains('.car-item', 'BMW X5', '26300')
        cy.get('.car-item').first(() => {
            cy.get('.car_edit').click()    
        })
        cy.get('.modal-content').should('be.visible');
        cy.get('button', 'Remove car').click()
        
   })

});
});