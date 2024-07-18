import requests
from datetime import datetime


# Register a new user
url = "http://localhost:8000/register"
data = {
    "id": 3,
    "role": "user",
    "username": "testuser",
    "email": "testuser@example.com",
    "password_hash": "testpassword",
    "created_at": datetime.now().isoformat(),
    "updated_at": datetime.now().isoformat()
}
response = requests.post(url=url, json=data)

# Print the response
print(response.status_code)
print(response.json())
