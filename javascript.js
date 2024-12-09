const apiKey = "yum-ngfeNG1iaq9Q2PJK"

const url = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/"

const tenantData = {
    name: "andreas",
    access: "abc123"
  };
  
  fetch('/tenants', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
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
  });

/* fetch('/keys', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else if (response.status === 401) {
      throw new Error('Invalid API key');
    } else {
      throw new Error(`HTTP error ${response.status}`);
    }
  })
  .then(data => {
    console.log('API key response:', data);
  })
  .catch(error => {
    console.error('Error getting API key:', error);
  }); */