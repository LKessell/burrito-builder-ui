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
      statusCode: 201,
      body: {
        id: 3,
        name: 'Lolo MAXXX',
        ingredients: ['pico de gallo', 'carnitas']
      },
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

  it('Should update order ingredients when the buttons are clicked', () => {
    cy.get('button').contains('guacamole').click();
    cy.contains('Order: guacamole');
    cy.get('button').contains('carnitas').click();
    cy.contains('Order: carnitas, guacamole');
  });

  it('Order will not be added if it does not contain a name', () => {
    cy.get('.order').should('have.length', 2);
    cy.get('button').contains('Submit Order').click();
    cy.get('.order').should('have.length', 2);
    cy.get('button').contains('guacamole').click();
    cy.get('button').contains('Submit Order').click();
    cy.get('.order').should('have.length', 2);
  });

  it('Order will not be added if it contains no ingredients', () => {
    cy.get('.order').should('have.length', 2);
    cy.get('input').type('Lolo MAXXX');
    cy.get('button').contains('Submit Order').click();
    cy.get('.order').should('have.length', 2);
  });

  it('After adding a name and choosing ingredients, the form can be submitted successfully', () => {
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
        }, {
          id: 3,
          name: 'Lolo MAXXX',
          ingredients: ['pico de gallo', 'carnitas']
        }
      ]
    });

    cy.get('.order').should('have.length', 2);
    cy.get('input').type('Lolo MAXXX');
    cy.get('button').contains('guacamole').click();
    cy.get('button').contains('pico de gallo').click();
    cy.get('button').contains('Submit Order').click();
    cy.get('.order').should('have.length', 3);
  });
});
