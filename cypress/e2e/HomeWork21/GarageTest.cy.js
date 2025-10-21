import { LoginPage } from '../../pages/LoginPage';
import { GaragePage } from '../../pages/garagePage';

describe('Garage tests', () => {
  const loginPage = new LoginPage();
  const garagePage = new GaragePage();

  beforeEach(() => {
    loginPage.login(Cypress.env('EMAIL'), Cypress.env('PASSWORD'));
  });

  it('should display all UI elements correctly', () => {
    garagePage.openAddCarModal();
    garagePage.verifyAddCarModal();
  });

  it('should modal window is open-close', () => {
    garagePage.openAddCarModal();
    garagePage.closeModal();
    garagePage.openAddCarModal();
  });

  it('should allow valid input and enable the Add button', () => {
    garagePage.addCar('BMW', 'X5', '25000');
    garagePage.findCarByBrandModel('BMW', 'X5').should('exist');
    garagePage.verifyCarMileage('25000');
  });

  it('should display all elements for a new car in the garage', () => {
    garagePage.verifyCarDetails('BMW X5');
    garagePage.verifyCarMileage('25000');
    garagePage.getEditButton().should('be.visible');
    garagePage.getAddFuelExpenseButton().should('be.visible');
    garagePage.verifyUpdateMileageForm();
    garagePage.updateCarMileage('26300');
    garagePage.verifyCarMileage('26300');
  });

  it('should display all UI elements correctly on the edit mode', () => {
    garagePage.openEditModal();
    garagePage.verifyEditCarModal();
  });

  it('should remove the car from garage', () => {
    garagePage.getCarItemText().then((carText) => {
      const carIdentifier = carText.split('\n')[0];
      garagePage.removeCar();
      cy.contains('.car-item', carIdentifier).should('not.exist');
    });
  });
});