const apiKey = 'yum-ngfeNG1iaq9Q2PJK'

const url = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com'

const tenantNamn = "Andreas"
const tenantId = "k6ja" 

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

// fetch entire menu and save in menu variable.
async function entireMenu(){
  const options = {
		headers: {
			"x-zocom": apiKey
		}
	}
	const response = await fetch(url + '/menu', options)
	const Menu = await response.json()
	console.log('Menu:', Menu) 
   
}
entireMenu()

// take variable loreKeeper and send
async function menuOrdersPost() {
  const options = {
    /* method = 'POST'
    body: json.stringify{ variable with id and count} */

  }
  const response = await fetch(url + '/{tenantID}/orders')
  const data = await response.json()
}

// get the order list
async function menuOrderGet() {
  const options = {
    /* method = 'GET'
     */

  }
  const response = await fetch(url + '/{tenantID}/orders')
  const data = await response.json()
  
}

export{ entireMenu}



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

