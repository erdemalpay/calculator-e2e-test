import '@testing-library/cypress/add-commands';

/** Helper functions  */

// This function is simulating the number clicks
function clickNumber(x) {
  return cy.findByRole('button', {name: x}).click();
}

// This function simulates the clicks to operators, or del and reset buttons
function clickSymbol(x) {
  return cy.findByText(x).click();
}

// This function takes a number as input and applies the necessary clicks
function typeNumber(number) {
  const digits = number.toString().split('');
  digits.forEach(digit => {
    if (isNaN(digit)) {
      clickSymbol('.');
    } else {
      clickNumber(digit);
    }
  })
}

// This function is checking the result value
// Please make sure that your display element has data-display attribute
function checkResult(value) {
  cy.get('[data-display]').should('have.text', value);
}

/** Helper functions end */

describe('Calculator test', () => {
  beforeEach(() => {
    // Before each test we are opening the application page.
    // Default url is set in cypress.json file with baseUrl key
    cy.visit('/');
  });

  it('should have all 18 buttons', () => {
    cy.get('button').should('have.length', 18);
  });

  it('should be able to print 10 digit numbers', () => {
    typeNumber(1246399702);
    checkResult(1246399702);
  });
  
  it('should be able print floating numbers', () => {
    typeNumber(1246.99702);
    checkResult(1246.99702);
  });

  it('should be able print floating numbers starting with 0', () => {
    typeNumber(0.1024);
    checkResult(0.1024);
  });
  
  it('should be able to add two numbers when pressed "=" button', () => {
    typeNumber(34.42);
    clickSymbol('+');
    typeNumber(28.129);
    clickSymbol('=');
    checkResult(62.549);
  });
  
  it('should be able to add two numbers when finished with "+" button', () => {
    typeNumber(0.1);
    clickSymbol('+');
    typeNumber(0.2);
    clickSymbol('+');
    checkResult(0.3);
  });
  
  it('should be able to add two numbers when finished with "-" button', () => {
    typeNumber(34.42);
    clickSymbol('+');
    typeNumber(28.129);
    clickSymbol('-');
    checkResult(62.549);
  });
  
  it('should be able to multiply two numbers when pressed "=" button', () => {
    typeNumber(34.42);
    clickSymbol('x');
    typeNumber(28.129);
    clickSymbol('=');
    checkResult(968.20018);
  });
  
  it('should show 0 when clicked to reset', () => {
    typeNumber(34.42);
    clickSymbol('RESET');
    checkResult(0);
  });
  
  it('should delete last number when clicked on del', () => {
    typeNumber(34.42);
    clickSymbol('DEL');
    checkResult(34.4);
    clickSymbol('DEL');
    checkResult("34.");
    clickSymbol('DEL');
    checkResult(34);
    clickSymbol('DEL');
    checkResult(3);
    clickSymbol('DEL');
    checkResult(0);
  }); 
  
  it('should be able to do division ', () => {
    typeNumber(34.42);
    clickSymbol('/');
    clickNumber(2);
    clickSymbol('=');
    checkResult(17.21);
  });
  
  it('should be able to do substraction ', () => {
    typeNumber(1.09);
    clickSymbol('-');
    typeNumber(0.1);
    clickSymbol('=');
    checkResult(0.99);
  });
});