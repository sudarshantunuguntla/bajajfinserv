from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/bfhl', methods=['POST'])
def bfhl_post():
    try:
        data = request.get_json()
        full_name = "devendrasudarshantunguntla"
        dob = "20072003"
        user_id = f"{full_name}_{dob}"

        numbers = [str(x) for x in data.get('data', []) if str(x).isdigit()]
        alphabets = [str(x) for x in data.get('data', []) if isinstance(x, str) and x.isalpha()]

        highest_alphabet = max(alphabets, key=lambda x: x.lower(), default=None)

        response = {
            "is_success": True,
            "user_id": user_id,
            "email_id": "devendrasudarshan_t@srmap.edu.in",
            "roll_number": "AP21110010353",
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_alphabet": [highest_alphabet] if highest_alphabet else []
        }

        return jsonify(response), 200

    except Exception as e:
        return jsonify({"is_success": False, "error": str(e)}), 400

@app.route('/bfhl', methods=['GET'])
def bfhl_get():
    return jsonify({"operation_code": 1}), 200

if __name__ == '__main__':
    app.run(debug=True)
