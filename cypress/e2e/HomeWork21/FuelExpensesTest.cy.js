import { LoginPage } from '../../pages/LoginPage';
import { FuelExpensesPage } from '../../pages/FuelExpensesPage';

describe('Fuel tests', () => {
  const loginPage = new LoginPage();
  const fuelPage = new FuelExpensesPage();

  beforeEach(() => {
    loginPage.login(Cypress.env('EMAIL'), Cypress.env('PASSWORD'));
  });

  it('should display all elements for fuel button', () => {
    cy.get('.car-item').should('exist');
    cy.get('.car-item').contains('button', 'Add fuel expense').should('be.visible');
  });

  it('should display all elements in add fuel modal', () => {
    cy.get('.car-item').contains('button', 'Add fuel expense').first().click();
    fuelPage.verifyAddExpenseModal();
  });

  it('should add fuel expense', () => {
    cy.get('.car-item').contains('button', 'Add fuel expense').first().click();
    fuelPage.fillExpenseForm('2000', '2000', '60000');
    fuelPage.submitExpenseForm();
  });

  it('should display all elements in fuel expense page', () => {
    fuelPage.openFuelExpenses();
    fuelPage.verifyFuelExpensesPage();
    fuelPage.verifyCarDropdown();
    fuelPage.verifyExpensesTable();
  });

  it('should edit fuel expenses', () => {
    fuelPage.openFuelExpenses();
    const row = fuelPage.getExpenseRowByLiters('2000');
    fuelPage.editExpense(row, '2005', '2001', '60010');
  });

  it('should delete fuel expenses and check ui components', () => {
    fuelPage.openFuelExpenses();
    const row = fuelPage.getExpenseRowByLiters('2001');
    fuelPage.deleteExpense(row);
    fuelPage.verifyDeleteModal();
  });

  it('should create fuel expenses and check ui components from footer', () => {
    fuelPage.openFuelExpenses();
    fuelPage.openAddExpenseModal();
    fuelPage.fillExpenseForm('3000', '4000', '60000');
    fuelPage.submitExpenseForm();
    fuelPage.verifyExpenseExists('19.10.2025', '3000', '4000L', '60000.00 USD');
  });
});