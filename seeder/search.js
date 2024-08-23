const fs = require('fs');

const postBulkProducts = async () => {
    try {
        // Dynamically import node-fetch
        const { default: fetch } = await import('node-fetch');

        // Read the JSON file
        
        const fileData = fs.readFileSync('bulk_data.json', 'utf8');
        
        // Send the bulk data to Elasticsearch
       
        // Send the bulk data to Elasticsearch
        const response = await fetch('http://localhost:9200/_bulk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: fileData,
        });
        
        // Parse and log the response
        const data = await response.json();
        if (response.ok) {
            console.log('Bulk operation successful:', data);
        } else {
            console.error('Bulk operation failed:', data);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

postBulkProducts();
