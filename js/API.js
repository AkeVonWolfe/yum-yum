

const apiKey = 'yum-ngfeNG1iaq9Q2PJK'

const url = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com'

const tenantNamn = "Andreas"
const tenantId = "k6ja" 
let wontonItems = [];

// if needed more tenants.
async function fetchTenant() {
  const options = {
		method: 'POST',
		body: JSON.stringify({ name: 'Andreas' }),
		headers: {
			"Content-Type": 'application/json',
			"x-zocom": apiKey
		}	
	}
	const response = await fetch(url + '/tenants', options)
	const data = await response.json()
	console.log('Tenant: ', data)
}

// fetch entire menu 
async function entireMenu() {
  return fetch(url + '/menu', {
    method: "GET",
    headers: {
      "x-zocom": apiKey,
      "Content-Type": "application/json",
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    wontonItems = data.items;
    return data.items;
  })
  .catch(error => {
    console.log(error);
    return [];
  });
}
entireMenu()

// post order 
function menuOrdersPost(addItemToOrder) {
  const orderData = {items: addItemToOrder
          .flatMap((item) => Array(item.quantity)
          .fill(Number(item.id))),
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-zocom": apiKey,
    },
    body: JSON.stringify(orderData),
  };

  return fetch(`${url}/${tenantId}/orders`, options)
    .then((response) => {
      if (!response.ok) {
        return response.text().then((errorResponse) => {
          console.error("Error", errorResponse);
          throw new Error(`${response.status}`);
        });
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error.message);
      throw error;
    });
}



export{ entireMenu, menuOrdersPost}



/* const tenantData = {
    name: "andreas"
  };
  
  fetch('/tenants', {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
      "x-zocom": apiKey
    },
    body: JSON.stringify(tenantData)
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else if (response.status === 401) {
      throw new Error('Invalid API key');
    } else if (response.status === 404) {
      throw new Error('Requested resource not found');
    } else {
      throw new Error(`HTTP error ${response.status}`);
    }
  })
  .then(data => {
    console.log('New tenant created:', data);
  })
  .catch(error => {
    console.error('Error creating tenant:', error);
  }); */

