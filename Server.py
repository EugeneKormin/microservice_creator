from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/api/generate-reply', methods=['POST', 'OPTIONS'])
def generate_reply():

    data = request.json
    idea_description = data.get('ideaDescription')
    print(f"Received idea description: {idea_description}")  # Log received data

    # Here you would process the idea and generate questions
    # For this example, we'll just return some dummy questions
    generated_questions = [
        "What is the main goal of your program?",
        "Who is the target audience for this program?",
        "What programming language do you plan to use?",
        "What are the key features you want to implement?"
    ]

    return jsonify({"questions": generated_questions})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
