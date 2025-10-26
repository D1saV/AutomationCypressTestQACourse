export class FuelExpensesPage {
    getFuelExpensesLink() {
        return cy.get('a[routerlink="expenses"]').contains('Fuel expenses');
    }

    getPanelHeading() {
        return cy.get('.panel-page_heading');
    }

    getCarDropdown() {
        return cy.get('#carSelectDropdown');
    }

    getCarDropdownMenu() {
        return cy.get('.car-select-dropdown_menu');
    }

    getActiveCarDropdownItem() {
        return cy.get('.car-select-dropdown_item.-active');
    }

    getAddExpenseButton() {
        return cy.contains('button', 'Add an expense');
    }

    getExpensesTable() {
        return cy.get('.expenses_table', { timeout: 10000 });
    }

    getExpenseRows() {
        return this.getExpensesTable().find('tbody tr');
    }

    getModalContent() {
        return cy.get('.modal-content');
    }

    getModalTitle() {
        return cy.get('.modal-title');
    }

    getModalHeader() {
        return cy.get('.modal-header');
    }

    getModalBody() {
        return cy.get('.modal-body');
    }

    getModalFooter() {
        return cy.get('.modal-footer');
    }

    getVehicleSelect() {
        return cy.get('#addExpenseCar');
    }

    getDateInput() {
        return cy.get('#addExpenseDate');
    }

    getMileageInput() {
        return cy.get('#addExpenseMileage');
    }

    getLitersInput() {
        return cy.get('#addExpenseLiters');
    }

    getTotalCostInput() {
        return cy.get('#addExpenseTotalCost');
    }

    getDatePickerIcon() {
        return cy.get('.btn.date-picker-toggle .icon-calendar');
    }

    getAddButton() {
        return this.getModalContent().contains('button', 'Add');
    }

    getSaveButton() {
        return this.getModalContent().contains('button', 'Save');
    }

    getCancelButton() {
        return this.getModalContent().contains('button', 'Cancel');
    }

    getRemoveButton() {
        return this.getModalContent().contains('button', 'Remove');
    }

    getEditButton(row) {
        return row.find('.btn-edit');
    }

    getDeleteButton(row) {
        return row.find('.btn-delete');
    }

    openFuelExpenses() {
        this.getFuelExpensesLink().click();
        cy.url().should('include', '/panel/expenses');
        cy.get('.panel-page_heading h1', { timeout: 10000 }).should('contain.text', 'Fuel expenses');
        return this;
    }

    verifyFuelExpensesPage() {
        this.getPanelHeading().within(() => {
            cy.get('h1').should('contain.text', 'Fuel expenses');
        });
        return this;
    }

    openAddExpenseModal() {
        this.getAddExpenseButton().click();
        this.getModalContent().should('be.visible');
        return this;
    }

    fillExpenseForm(mileage, liters, totalCost) {
        this.getMileageInput().clear().type(mileage);
        this.getLitersInput().clear().type(liters);
        this.getTotalCostInput().clear().type(totalCost);
        return this;
    }

    submitExpenseForm() {
        this.getAddButton().click();
        cy.wait(1000);
        return this;
    }

    saveExpenseForm() {
        this.getSaveButton().click();
        cy.wait(1000);
        return this;
    }

    getExpenseRowByLiters(liters) {
        return cy.contains('td', `${liters}L`).parents('tr');
    }

    hoverExpenseRow(row) {
        return row.realHover();
    }

    editExpense(row, mileage, liters, totalCost) {
        this.hoverExpenseRow(row);
        cy.wait(1000);
        this.getEditButton(row).click({ force: true });
        this.getModalContent().should('be.visible');
        this.fillExpenseForm(mileage, liters, totalCost);
        this.saveExpenseForm();
        return this;
    }

    deleteExpense(row) {
        this.hoverExpenseRow(row);
        cy.wait(1000);
        this.getDeleteButton(row).click({ force: true });
        this.getModalContent().should('be.visible');
        this.getRemoveButton().click();
        cy.wait(1000);
        return this;
    }

    verifyCarDropdown() {
        this.getCarDropdown().should('be.visible');
        return this;
    }

    verifyExpensesTable() {
        cy.get('body').then(($body) => {
            if ($body.find('.expenses_table').length > 0) {
                this.getExpensesTable().should('exist');
            }
        });
        return this;
    }

    verifyExpenseRowActions(row) {
        this.hoverExpenseRow(row);
        cy.wait(1000);
        this.getEditButton(row).should('exist');
        this.getDeleteButton(row).should('exist');
        return this;
    }

    verifyAddExpenseModal() {
        this.getModalTitle().should('contain', 'Add an expense');
        return this;
    }

    verifyDeleteModal() {
        this.getModalTitle().should('contain', 'Remove entry');
        return this;
    }

    verifyExpenseExists() {
        this.getExpenseRows().should('exist');
        return this;
    }

    getCloseButton() {
        return cy.get('.close, button[aria-label="Close"]').first();
    }

    closeModalIfOpen() {
        cy.get('body').then(($body) => {
            if ($body.find('.modal-content').length > 0) {
                this.getCancelButton().click();
                cy.wait(500);
            }
        });
        return this;
    }
}