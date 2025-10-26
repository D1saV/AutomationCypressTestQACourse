import { LoginPage } from '../../pages/LoginPage';
import { FuelExpensesPage } from '../../pages/FuelExpensesPage';

describe('Fuel tests', () => {
    const loginPage = new LoginPage();
    const fuelPage = new FuelExpensesPage();
    
    let carIdFromPreviousTest;

    beforeEach(() => {
        loginPage.login(Cypress.env('EMAIL'), Cypress.env('PASSWORD'));
        cy.readFile('cypress/fixtures/carId.json').then((carData) => {
            carIdFromPreviousTest = carData.id;
        });
    });

    it('should update car ID with current car', () => {
        cy.request('GET', '/api/cars').then((response) => {
            const cars = response.body.data;
            expect(cars.length).to.be.greaterThan(0);
            const currentCar = cars[cars.length - 1];
            cy.writeFile('cypress/fixtures/carId.json', { id: currentCar.id });
            cy.log(`Car ID updated to: ${currentCar.id} with mileage: ${currentCar.initialMileage}`);
        });
    });

    it('should create expense via API using existing car ID', () => {
        cy.log(` car ID from previous test: ${carIdFromPreviousTest}`);

        cy.request('GET', `/api/cars/${carIdFromPreviousTest}`).then((carResponse) => {
            const carMileage = carResponse.body.data.initialMileage;
            
            const expenseData = {
                mileage: carMileage + 500,
                liters: 60,
                totalCost: 120
            };

            cy.createExpenseViaApi(carIdFromPreviousTest, expenseData).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(`Expense created with ID: ${response.body.data.id}`);
            });
        });
    });

    it('should create multiple expenses via API with different data', () => {
        cy.request('GET', `/api/cars/${carIdFromPreviousTest}`).then((carResponse) => {
            const carMileage = carResponse.body.data.initialMileage;
            
            const expenses = [
                {
                    mileage: carMileage + 1000,
                    liters: 30,
                    totalCost: 50
                },
                {
                    mileage: carMileage + 1500,
                    liters: 35,
                    totalCost: 60
                }
            ];

            expenses.forEach((expenseData, index) => {
                cy.createExpenseViaApi(carIdFromPreviousTest, expenseData).then((response) => {
                    expect(response.status).to.eq(200);
                    cy.log(`Expense ${index + 1} created successfully`);
                });
            });
        });
    });

    it('should validate created expense via UI', () => {
        fuelPage.openFuelExpenses();
        
        cy.readFile('cypress/fixtures/carId.json').then((carData) => {
            const carId = carData.id;
            
            cy.request('GET', '/api/cars').then((carsResponse) => {
                const car = carsResponse.body.data.find(c => c.id === carId);
                expect(car).to.exist;
                
                const carName = `${car.brand} ${car.model}`;
                cy.log(`Validating expenses for car: ${carName}`);
                
                fuelPage.getActiveCarDropdownItem().should('contain', carName);
                
                cy.wait(2000);
                
                fuelPage.getExpenseRows().should('exist');
                
                const expectedExpenses = [
                    { liters: '60L', cost: '120.00' },
                    { liters: '30L', cost: '50.00' },
                    { liters: '35L', cost: '60.00' }
                ];
                
                expectedExpenses.forEach(expense => {
                    fuelPage.getExpensesTable().should('contain', expense.liters);
                    fuelPage.getExpensesTable().should('contain', expense.cost);
                });
                
                cy.log('All expenses validated successfully in UI');
            });
        });
    });

    it('should display all elements for fuel button', () => {
        cy.get('.car-item').should('exist');
        cy.get('.car-item').contains('button', 'Add fuel expense').should('be.visible');
    });

    it('should display all elements in add fuel modal', () => {
        cy.get('.car-item').contains('button', 'Add fuel expense').first().click();
        fuelPage.verifyAddExpenseModal();
        fuelPage.closeModalIfOpen();
    });

    it('should add fuel expense', () => {
        cy.get('.car-item').contains('button', 'Add fuel expense').first().click();
        fuelPage.fillExpenseForm('16000', '20', '60');
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
        fuelPage.openAddExpenseModal();
        fuelPage.fillExpenseForm('17000', '25', '50');
        fuelPage.submitExpenseForm();
        
        cy.contains('25L', { timeout: 10000 }).should('exist');
        cy.wait(2000);
        
        const row = fuelPage.getExpenseRowByLiters('25');
        fuelPage.editExpense(row, '17500', '26', '55');
    });

    it('should delete fuel expenses and check ui components', () => {
        fuelPage.openFuelExpenses();
        fuelPage.openAddExpenseModal();
        fuelPage.fillExpenseForm('18000', '30', '70');
        fuelPage.submitExpenseForm();
        
        cy.contains('30L', { timeout: 10000 }).should('exist');
        cy.wait(2000);
        
        const row = fuelPage.getExpenseRowByLiters('30');
        fuelPage.deleteExpense(row);
    });

    it('should create fuel expenses and check ui components from footer', () => {
        fuelPage.openFuelExpenses();
        fuelPage.openAddExpenseModal();
        fuelPage.fillExpenseForm('19000', '40', '80');
        fuelPage.submitExpenseForm();
        fuelPage.verifyExpenseExists();
    });
});