describe('Testing environment', () => {
  it('Should expect true to be true', () => {
    expect(true).to.equal(true);
  });
});

describe('App user flows', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/orders', {
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
  });

  it('Should be able to visit the page and see a list of orders', () => {
    cy.visit('http://localhost:3000/');
    cy.contains('Burrito Builder');
    cy.get('div').should('have.class', 'order').contains('Lauren');
  });

  it('Order cards should contain a name a list of ingredients', () => {
    cy.visit('http://localhost:3000/');
    cy.get('h3').contains('Lauren');
    cy.get('ul').first().should('have.class', 'ingredient-list')
      .children('li').should('have.length', 3);
  })

  it('Should contain a form to add new orders', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input').should('have.value', '');
    cy.get('button').contains('beans')
      .should('have.value', 'beans');
    cy.get('button').contains('guacamole')
      .should('have.value', 'guacamole');
    cy.get('button').contains('Submit Order');
  });
});
