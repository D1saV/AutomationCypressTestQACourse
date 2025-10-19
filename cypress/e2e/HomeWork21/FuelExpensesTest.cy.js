describe('Fuel tests', () => {
  beforeEach(() => {
    cy.loginQauto(Cypress.env('EMAIL'), Cypress.env('PASSWORD'));
  });

  it('should display all elements for fuel button', () => {
    cy.get('.car-list').should('be.visible');
    cy.get('.car-item').should('exist').and('be.visible');
    cy.get('.car-item').first().within(() => {
      cy.get('.car_actions').first().contains('button', 'Add fuel expense').should('be.visible');
    });
  });

  it('should display all elements in add fuel modal', () => {
    cy.get('.car-item').first().within(() => {
      cy.get('.car_actions').first().contains('button', 'Add fuel expense').click();
    });
    cy.get('.modal-content').should('be.visible');
    cy.get('.modal-title').should('contain', 'Add an expense');
    cy.get('button.close').should('exist').and('be.visible');
    cy.get('label[for="addExpenseCar"]').should('contain', 'Vehicle');
    cy.get('#addExpenseCar').should('be.visible').and('have.class', 'form-control');
    cy.get('label[for="addExpenseDate"]').should('contain', 'Report date');
    cy.get('#addExpenseDate').should('be.visible').and('have.attr', 'type', 'text');
    cy.get('.btn.date-picker-toggle .icon-calendar').should('be.visible');
    cy.get('label[for="addExpenseMileage"]').should('contain', 'Mileage');
    cy.get('#addExpenseMileage').should('be.visible').and('have.attr', 'type', 'number').and('have.class', 'form-control');
    cy.get('#addExpenseMileage').parent().contains('km');
    cy.get('label[for="addExpenseLiters"]').should('contain', 'Number of liters');
    cy.get('#addExpenseLiters').should('be.visible').and('have.attr', 'type', 'number').and('have.class', 'form-control');
    cy.get('#addExpenseLiters').parent().contains('L');
    cy.get('label[for="addExpenseTotalCost"]').should('contain', 'Total cost');
    cy.get('#addExpenseTotalCost').should('be.visible').and('have.attr', 'type', 'number').and('have.class', 'form-control');
    cy.get('#addExpenseTotalCost').parent().contains('$');
    cy.contains('button', 'Cancel').should('be.visible').and('have.class', 'btn-secondary');
    cy.get('.modal-content').contains('button', 'Add').should('be.visible').and('have.class', 'btn-primary').should('have.prop', 'disabled', true);
  });

  it('should add fuel expense', () => {
    cy.get('.car-item').first().within(() => {
      cy.get('.car_actions').first().contains('button', 'Add fuel expense').click();
    });
    cy.get('.modal-content').should('be.visible').within(() => {
      cy.get('#addExpenseMileage').should('be.visible').and('not.be.disabled').clear().type('2000');
      cy.get('#addExpenseLiters').should('be.visible').and('not.be.disabled').type('2000');
      cy.get('#addExpenseTotalCost').should('be.visible').and('not.be.disabled').type('60000');
      cy.contains('button', 'Add').should('not.be.disabled').click();
    });
  });

  it('should display all elements in fuel expense page', () => {
    cy.get('a[href="/panel/expenses"]').contains('Fuel expenses').click();
    cy.url().should('include', '/panel/expenses');
    cy.get('.panel-page_heading').within(() => {
      cy.get('h1').should('contain.text', 'Fuel expenses');
      cy.get('.item-group').within(() => {
        cy.get('#carSelectDropdown')
          .should('be.visible')
          .and('have.class', 'dropdown-toggle')
          .and('contain.text', 'Audi TT');
        cy.get('button.btn-primary')
          .should('be.visible')
          .and('contain.text', 'Add an expense');
      });
    });
    cy.get('#carSelectDropdown')
      .should('be.visible')
      .and('contain.text', 'Audi TT')
      .click();
    cy.get('.car-select-dropdown_menu')
      .should('be.visible');
    cy.get('.car-select-dropdown_item.-active.disabled')
      .should('exist')
      .and('contain.text', 'Audi TT');
    cy.get('#carSelectDropdown').click();
    cy.get('.expenses_table').within(() => {
      cy.get('thead').within(() => {
        cy.get('th').eq(0).should('contain.text', 'Date');
        cy.get('th').eq(1).should('contain.text', 'Mileage');
        cy.get('th').eq(2).should('contain.text', 'Liters used');
        cy.get('th').eq(3).should('contain.text', 'Total cost');
        cy.get('th').eq(4).should('be.empty');
      });
    });
    cy.contains('td', '2000L')
      .parents('tr')
      .realHover()
      .within(() => {
        cy.get('td').eq(4).within(() => {
          cy.get('.btn-delete').should('be.visible');
          cy.get('.btn-edit').should('be.visible');
        });
      });
  });

  it('should edit fuel expenses', () => {
    cy.get('a[href="/panel/expenses"]').contains('Fuel expenses').click();
    cy.url().should('include', '/panel/expenses');
    cy.contains('td', '2000L')
      .parents('tr')
      .realHover()
      .within(() => {
        cy.get('td').eq(4).within(() => {
          cy.get('.btn-edit').should('be.visible').click();
        });
      });
    cy.get('.modal-content').should('be.visible').within(() => {
      cy.get('#addExpenseMileage').should('be.visible').and('not.be.disabled').clear().type('2005');
      cy.get('#addExpenseLiters').should('be.visible').and('not.be.disabled').clear().type('2001');
      cy.get('#addExpenseTotalCost').should('be.visible').and('not.be.disabled').clear().type('60010');
      cy.contains('button', 'Save').should('not.be.disabled').click();
    });
  });

  it('should delete fuel expenses and check ui components', () => {
    cy.get('a[href="/panel/expenses"]').contains('Fuel expenses').click();
    cy.url().should('include', '/panel/expenses');
    cy.contains('td', '2001L')
      .parents('tr')
      .realHover()
      .within(() => {
        cy.get('td').eq(4).within(() => {
          cy.get('.btn-delete').should('be.visible').click();
        });
      });
    cy.get('.modal-content').should('be.visible').within(() => {
      cy.get('.modal-header').within(() => {
        cy.get('.modal-title').should('have.text', 'Remove entry');
        cy.get('button.close')
          .should('be.visible')
          .and('have.attr', 'aria-label', 'Close')
          .find('span')
          .should('contain', '×');
      });
      cy.get('.modal-body').invoke('text').then((text) => {
        const today = new Date();
        const formatted = today.toLocaleDateString('uk-UA', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
        expect(text.trim()).to.match(
          new RegExp(`Do you really want to remove fuel expense entry from ${formatted}\\?`)
        );
      });
      cy.get('.modal-footer').within(() => {
        cy.contains('button', 'Cancel').should('be.visible').and('have.class', 'btn-secondary');
        cy.contains('button', 'Remove').should('be.visible').and('have.class', 'btn-danger');
      });
      cy.get('.modal-footer').within(() => {
        cy.contains('button', 'Remove').should('be.visible').and('have.class', 'btn-danger').click();
      });
    });
  });

  it('should createfuel expenses and check ui components from footer', () => {
    cy.get('a[href="/panel/expenses"]').contains('Fuel expenses').click();
    cy.url().should('include', '/panel/expenses');
    cy.get('button').contains('Add an expense').click();
    cy.get('.modal-content').should('be.visible').within(() => {
      cy.get('#addExpenseMileage').should('be.visible').and('not.be.disabled').clear().type('3000');
      cy.get('#addExpenseLiters').should('be.visible').and('not.be.disabled').type('4000');
      cy.get('#addExpenseTotalCost').should('be.visible').and('not.be.disabled').type('60000');
      cy.contains('button', 'Add').should('not.be.disabled').click();
    });
    cy.get('.expenses_table tbody tr').should('exist').and(($rows) => {
      const found = $rows.toArray().some((row) => {
        const cells = Array.from(row.querySelectorAll('td')).map((td) => td.innerText.trim());
        return (
          cells[0] === '19.10.2025' &&
          cells[1] === '3000' &&
          cells[2] === '4000L' &&
          cells[3] === '60000.00 USD'
        );
      });
      expect(found).to.be.true;
    });
  });
});
