export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
    .then(response => response.json())
}

export const postNewOrder = (newOrder) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newOrder)
  };

  return fetch('http://localhost:3001/api/v1/orders', options)
    .then(response => response.json())
}
