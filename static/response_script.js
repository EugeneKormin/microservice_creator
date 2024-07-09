document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('programIdeaForm');
    const ideaDescription = document.getElementById('ideaDescription');
    const generatedCodeContainer = document.getElementById('generatedCodeContainer');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            if (!ideaDescription) {
                console.error('Idea description input not found');
                return;
            }

            const ideaDescriptionValue = ideaDescription.value;

            fetch('http://172.17.0.3:8000/api/generate-reply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ideaDescription: ideaDescriptionValue
                }),
                mode: 'cors',
                credentials: 'include'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Received data:', data);
                if (generatedCodeContainer) {
                    generatedCodeContainer.innerHTML = '';
                    if (data.questions && Array.isArray(data.questions)) {
                        data.questions.forEach(function(question) {
                            const p = document.createElement('p');
                            p.textContent = question;
                            generatedCodeContainer.appendChild(p);
                        });
                    } else {
                        console.error('Unexpected data format:', data);
                        generatedCodeContainer.textContent = 'Unexpected response from server';
                    }
                } else {
                    console.error('Generated code container not found');
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        });
    } else {
        console.error('Form not found');
    }
});