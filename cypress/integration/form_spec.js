describe('Order form user flows', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      orders: [
        {
          id: 1,
          name: 'Lauren',
          ingredients: ['carnitas', 'pico de gallo', 'queso fresco']
        }, {
          id: 2,
          name: 'Lestrende',
          ingredients: ['steak', 'sour cream']
        }
      ]
    });
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
      statusCode: 204
    });
    cy.visit('http://localhost:3000/');
  });

  it('Should prompt the user to input a name and select ingredients', () => {
    cy.contains('Please enter your name and choose at least one ingredient');
    cy.contains('Order: Nothing selected');
  });

  it('Name should update when typing into the input', () => {
    cy.get('input').should('have.value', '').type('Lolo MAXXX')
      .should('have.value', 'Lolo MAXXX');
  });
  
});
