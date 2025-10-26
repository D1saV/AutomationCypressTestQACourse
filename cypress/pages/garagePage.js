export class GaragePage {
  getAddCarButton() {
    return cy.contains('button', 'Add car');
  }

  getModalContent() {
    return cy.get('.modal-content');
  }

  getModalTitle() {
    return cy.get('.modal-title');
  }

  getCloseButton() {
    return cy.get('button.close');
  }

  getCarList() {
    return cy.get('.car-list');
  }

  getCarItems() {
    return cy.get('.car-item');
  }

  getFirstCarItem() {
    return this.getCarItems().first();
  }

  getBrandSelect() {
    return cy.get('#addCarBrand');
  }

  getModelSelect() {
    return cy.get('#addCarModel');
  }

  getMileageInput() {
    return cy.get('#addCarMileage');
  }

  getAddButton() {
    return this.getModalContent().contains('button', 'Add');
  }

  getCancelButton() {
    return cy.contains('button', 'Cancel');
  }

  getInputGroupText() {
    return cy.get('.input-group-text');
  }

  getCarLogo() {
    return cy.get('.car-item .car-logo').first();
  }

  getCarName() {
    return cy.get('.car-item .car-name').first();
  }

  getCarActions() {
    return cy.get('.car-item .car_actions').first();
  }

  getCarBody() {
    return cy.get('.car-item .car-body').first();
  }

  getEditButton() {
    return cy.get('.car-item .car_edit').first();
  }

  getAddFuelExpenseButton() {
    return cy.contains('button', 'Add fuel expense').first();
  }

  getUpdateMileageForm() {
    return cy.get('form.update-mileage-form').first();
  }

  getUpdateMileageIcon() {
    return cy.get('.update-mileage-form_icon').first();
  }

  getUpdateMileageInput() {
    return cy.get('input[name="miles"]').first();
  }

  getUpdateMileageSubmit() {
    return cy.get('button.update-mileage-form_submit').first();
  }

  getUpdateMileageDate() {
    return cy.get('.car_update-mileage').first();
  }

  getEditModalHeader() {
    return cy.get('.modal-header');
  }

  getEditModalFooter() {
    return cy.get('.modal-footer');
  }

  getRemoveCarButton() {
    return cy.contains('button', 'Remove car');
  }

  getSaveButton() {
    return cy.contains('button', 'Save');
  }

  getCarCreationDateInput() {
    return cy.get('#carCreationDate');
  }

  getDatePickerIcon() {
    return cy.get('.icon-calendar');
  }

  interceptCarCreation() {
    return cy.intercept('POST', '/api/cars').as('createCar');
  }

  openAddCarModal() {
    this.getAddCarButton().click();
    this.getModalContent().should('be.visible');
    return this;
  }

  verifyAddCarModal() {
    this.getModalTitle().should('contain', 'Add a car');
    this.getCloseButton().should('exist').and('be.visible');
    cy.get('label[for="addCarBrand"]').should('contain', 'Brand');
    cy.get('label[for="addCarModel"]').should('contain', 'Model');
    cy.get('label[for="addCarMileage"]').should('contain', 'Mileage');
    this.getBrandSelect().should('be.visible').and('have.class', 'form-control');
    this.getModelSelect().should('be.visible').and('have.class', 'form-control');
    this.getMileageInput()
      .should('be.visible')
      .and('have.attr', 'type', 'number')
      .and('have.class', 'form-control');
    this.getInputGroupText().should('contain', 'km');
    this.getCancelButton().should('be.visible').and('have.class', 'btn-secondary');
    this.getAddButton().should('be.visible').and('have.class', 'btn-primary').and('be.disabled');
    return this;
  }

  closeModal() {
    this.getCloseButton().click();
    this.getModalContent().should('not.be.visible');
    return this;
  }

  addCar(brand, model, mileage) {
    this.interceptCarCreation();
    
    this.openAddCarModal();
    this.selectBrand(brand);
    this.selectModel(model);
    this.enterMileage(mileage);
    this.getAddButton().should('not.be.disabled').click();
    
    return cy.wait('@createCar').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      
      const carId = interception.response.body.data.id;
      
      cy.writeFile('cypress/fixtures/carId.json', { id: carId });

      cy.contains('.car-item', brand, { timeout: 10000 }).should('exist');
      cy.contains('.car-item', model).should('exist');
      
      return cy.wrap(carId);
    });
  }

  selectBrand(brand) {
    this.getBrandSelect().select(brand);
    return this;
  }

  selectModel(model) {
    this.getModelSelect().select(model);
    return this;
  }

  enterMileage(mileage) {
    this.getMileageInput().clear().type(mileage);
    return this;
  }

  openEditModal() {
    this.getEditButton().click();
    this.getModalContent().should('be.visible');
    return this;
  }

  verifyEditCarModal() {
    this.getEditModalHeader().within(() => {
      this.getModalTitle().should('contain', 'Edit a car');
    });
    cy.get('label[for="addCarBrand"]').should('contain', 'Brand');
    this.getBrandSelect().should('be.visible');
    cy.get('label[for="addCarModel"]').should('contain', 'Model');
    this.getModelSelect().should('be.visible');
    cy.get('label[for="addCarMileage"]').should('contain', 'Mileage');
    this.getMileageInput().should('be.visible');
    this.getEditModalFooter().within(() => {
      this.getRemoveCarButton().should('be.visible');
      this.getCancelButton().should('be.visible');
      this.getSaveButton().should('be.visible');
    });
    return this;
  }

  updateCarMileage(newMileage) {
    this.getUpdateMileageInput().clear().type(newMileage);
    this.getUpdateMileageSubmit().should('be.enabled').click();
    return this;
  }

  verifyCarDetails(expectedBrandModel) {
    this.getFirstCarItem().should('be.visible');
    this.getFirstCarItem().should('contain', expectedBrandModel);
    this.getCarActions().should('be.visible');
    this.getCarBody().should('be.visible');
    return this;
  }

  verifyCarMileage(expectedMileage) {
    this.getUpdateMileageInput().should('have.value', expectedMileage);
    return this;
  }

  verifyUpdateMileageForm() {
    this.getCarBody().should('be.visible');
    this.getUpdateMileageInput().should('be.visible');
    this.getUpdateMileageSubmit().should('be.visible');
    return this;
  }

  removeCar() {
    this.openEditModal();
    this.getRemoveCarButton().click();
    
    cy.contains('button', 'Remove', { timeout: 5000 })
      .should('be.visible')
      .click();
    
    this.getModalContent().should('not.exist');
    
    cy.get('.car-list').then(($carList) => {
      if ($carList.find('.car-item').length === 0) {
        cy.get('.car-item').should('not.exist');
      } else {
        cy.contains('.car-item', 'Ford Focus').should('not.exist');
      }
    });
    return this;
  }

  findCarByBrandModel(brand, model) {
    return cy.contains('.car-item', `${brand} ${model}`);
  }

  getCarMileageValue() {
    return this.getUpdateMileageInput().invoke('val');
  }

  getCarItemText() {
    return this.getFirstCarItem().invoke('text');
  }
}