describe('template spec', () => {
  it('should load successfully the home page.', () => {
    cy.visit('http://localhost:5173/')
  })

  it('should try submit a blank form, fail then reset form.', () => {
    cy.visit('http://localhost:5173/')
    cy.wait(2000)
    cy.get('[data-cy=add-vacation]').click()
    cy.wait(2000)
    cy.get('[data-cy=form-submit]').click()
    cy.wait(2000)
    cy.get('[data-cy=form-reset]').click()
  })

  it('should submit a new vacation.', () => {
    cy.visit('http://localhost:5173/')
    cy.wait(2000)
    cy.get('[data-cy=add-vacation]').click()
    cy.get('[data-cy=form-title]').type('Cypress')
    cy.get('[data-cy=form-location]').type('On cypress')
    cy.get('[data-cy=form-description]').type('Running a test using cypress')
    cy.get('[data-cy=form-submit]').click()
    cy.wait(2000)
    cy.get('[data-cy=form-reset]').click()
  })

  it('should add a participant to the first vacation.', () => {
    cy.visit('http://localhost:5173/')
    cy.wait(2000)
    cy.get('[data-cy=add-participant-0]').click()
    cy.get('[data-cy=participant-input]').type('cy')
    cy.get('[data-cy=participant-submit]').click()
    cy.wait(2000)
    cy.get('[data-cy=participant-input]').type('press')
    cy.get('[data-cy=participant-submit]').click()
    cy.wait(3000)
  })

  it('should open the schedule widget, select the "nth-child(4), then close."', () =>{
    cy.visit('http://localhost:5173/')
    cy.wait(2000)
    cy.get('[data-cy=open-calendar-0]').click()
    cy.get('#radix-\\:r9\\: > div > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(4)').click()
    cy.wait(3000)
    cy.get('[data-cy=open-calendar-0]').click()
  })

  it('should download a pdf file', () => {
    cy.visit('http://localhost:5173/')
    cy.wait(4000)
    cy.get('[data-cy=download-pdf]').click()
  })

  it('should delete the first vacation on the table.', () => {
    cy.visit('http://localhost:5173/')
    cy.wait(4000)
    cy.get('[data-cy=delete-item-0]').click()
    cy.wait(2000)
  })
})
