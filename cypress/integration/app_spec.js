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
          name: Lauren,
          ingredients: ['carnitas', 'pico de gallo', 'queso fresco']
        }, {
          id: 2,
          name: Lestrende,
          ingredients: ['steak', 'sour cream']
        }
      ]
    });
  });
});
