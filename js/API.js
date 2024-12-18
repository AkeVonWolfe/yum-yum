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


async function menuOrdersPost() {
  const orderData = {
		items: cartManager
			.getCartItems()
			.flatMap((item) => Array(item.quantity).fill(Number(item.id))),
	};
	// console.log("placing order", orderData)
	try {
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
        "x-zocom": apiKey,
			},
			body: JSON.stringify(orderData),
		};

		// console.log("Order data before sending:", JSON.stringify(orderData));
    const response = await fetch(`${url}${tenantId}/orders`, options);

		if (!response.ok) {
			const errorResponse = await response.text();
			console.error("Error response", errorResponse);
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		// console.log('Order placed sucsessfully', data);
		return data;
	} catch (error) {
		console.error("Error placing order", error.message);
		throw error;
	}
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

