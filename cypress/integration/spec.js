describe('First Test', function () {
    it('Visits the Home Page', function () {
        cy.visit('http://the-internet.herokuapp.com')
    })
})

describe('Checkboxes Page', function () {
    it('Visit Checkboxes Page and for each box change to the opposite state then validate changes', function () {
      cy.visit('http://the-internet.herokuapp.com')
    
      cy.contains('Checkboxes').click()

      cy.url().should('eq', 'http://the-internet.herokuapp.com/checkboxes')

      cy.contains('checkbox 1')
      //cy.get('[type="checkbox"]').check('checkbox 1')
      cy.get('[type="checkbox"]').check()
      cy.get('[type="checkbox"]').should('be.checked')
      
      cy.contains('checkbox 2')
      cy.get('[type="checkbox"]').uncheck()
      cy.get('[type="checkbox"]').should('be.unchecked')
    })
  })