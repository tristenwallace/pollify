/// <reference types="cypress" />

describe('Pollify End-to-End Tests', () => {
  beforeEach(() => {
    cy.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD')); // Use valid credentials
  });

  it('Visits the Pollify app and checks the homepage', () => {
    const baseUrl = Cypress.config('baseUrl') || 'http://localhost:3000';
    cy.visit(baseUrl);
    cy.contains('Take a look at the most recent polls!');
  });

  it('Creates a new poll and verifies it on the dashboard', () => {
    const baseUrl = Cypress.config('baseUrl') || 'http://localhost:3000';
    cy.visit(`${baseUrl}/create`);
    cy.get('input[id="optionOneText"]').type('go scuba diving');
    cy.get('input[id="optionTwoText"]').type('skydiving');
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', `${baseUrl}/`); // Verify redirection to home
    cy.contains('Would you rather go scuba diving or skydiving?'); // Verify the new poll appears
  });
});
