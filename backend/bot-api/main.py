from flask import Flask, request, jsonify
from ai import get_response
from flask_cors import CORS
from therapist import therapist_resp

app = Flask(__name__)
CORS(app)

@app.route('/api/chat', methods=['POST'])
def chatbot():
    print("Got Request!")
    data = request.get_json()

    prompt = data.get('prompt')
    username = data.get('username')

    print("Getting response")

    response = get_response(prompt=prompt, username=username)

    print("Got response!")

    return jsonify(
        {
            "response": response,
            "username": username,
            "prompt": prompt,
            "status": 200
        }
    )

@app.route('/api/therapist', methods=['POST'])
def therapist():
    print("Got Request!")
    data = request.get_json()

    prompt = data.get('prompt')
    username = data.get('username')

    print("Getting response")

    response = therapist_resp(prompt=prompt, username=username)

    print("Got response!")

    return jsonify(
        {
            "response": response,
            "username": username,
            "prompt": prompt,
            "status": 200
        }
    )



if __name__ == '__main__':
    app.run(port=5000)