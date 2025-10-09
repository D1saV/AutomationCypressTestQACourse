describe('HomeWork19', () => {
  beforeEach(() => {
    
    cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/')
  })
  it('Find the header elements', () => {
    cy.get('.header_logo')
    cy.get('[class="btn header-link -active"]').contains('Home')
    cy.get('[class="btn header-link"]').contains('About')
    cy.get('[class="btn header-link"]').contains('Contacts')
    cy.get('[class="header-link -guest"]').contains('Guest log in')
    cy.get('[class="btn btn-outline-white header_signin"]').contains('Sign In')
  })

  it('Find the contacts section elements', () => {
   // social-media find by icon
    cy.get('.icon-facebook').parent()
    cy.get('.icon-telegram').parent()
    cy.get('.icon-youtube').parent()
    cy.get('.icon-instagram').parent()
    cy.get('.icon-linkedin').parent()
        //social-media find by link
    cy.get('a[href*="facebook.com"]')
    cy.get('a[href*="t.me"]')
    cy.get('a[href*="youtube.com"]')
    cy.get('a[href*="instagram.com"]')
    cy.get('a[href*="linkedin.com"]')

    //hillel links on web by class
    cy.get('[class="contacts_link display-4"]').contains('ithillel.ua')
    cy.get('[class="contacts_link h4"]').contains('support@ithillel.ua')
        //hillel links on web by link
    cy.get('a[href*="ithillel.ua"]').contains('ithillel.ua')
    cy.get('a[href*="mailto:developer@ithillel.ua"]').contains('support@ithillel.ua')
  })

  it('Find the footer elements', () => {
    //for left elements
    cy.get('.footer_item.-left').within(() => {
    cy.get('p').eq(0).should('contain', '© 2021 Hillel IT school')
    cy.get('p').eq(1).should('contain', 'Hillel auto developed')
    })
    //for right elements
    cy.get('.footer_item.-right').find('.footer_logo')
    
  })
})

