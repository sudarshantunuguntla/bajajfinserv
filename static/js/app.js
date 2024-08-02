function submitJson() {
    const inputField = document.getElementById('json-input');
    const jsonString = inputField.value.trim();
    const errorMessage = document.getElementById('error-message');
    const dropdownContainer = document.getElementById('dropdown-container');

    try {
        const jsonData = JSON.parse(jsonString);
        errorMessage.textContent = '';
        callApi(jsonData)
            .then(responseData => {
                window.responseData = responseData;
                dropdownContainer.style.display = 'block';
                renderResponse();
            })
            .catch(error => {
                errorMessage.textContent = 'Error calling the API: ' + error.message;
            });
    } catch (e) {
        errorMessage.textContent = 'Invalid JSON format. Please correct and try again.';
    }
}

function callApi(payload) {
    return new Promise((resolve, reject) => {
        fetch('/bfhl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
}
function renderResponse() {
    const selectedOptions = Array.from(document.getElementById('response-options').selectedOptions).map(option => option.value);
    const responseData = window.responseData || {};
    const responseContainer = document.getElementById('response-container');

    let responseHtml = '<h3>Response Data</h3>';
    if (selectedOptions.includes('alphabets') && responseData.alphabets && responseData.alphabets.length > 0) {
        responseHtml += `<p><strong>Alphabets:</strong> ${responseData.alphabets.join(', ')}</p>`;
    }
    if (selectedOptions.includes('numbers') && responseData.numbers && responseData.numbers.length > 0) {
        responseHtml += `<p><strong>Numbers:</strong> ${responseData.numbers.join(', ')}</p>`;
    }
    if (selectedOptions.includes('highest-alphabet') && responseData.highest_alphabet && responseData.highest_alphabet.length > 0) {
        responseHtml += `<p><strong>Highest Alphabet:</strong> ${responseData.highest_alphabet}</p>`;
    }

    responseContainer.innerHTML = responseHtml;
}
document.getElementById('response-options').addEventListener('change', renderResponse);
