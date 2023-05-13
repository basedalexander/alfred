from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/', methods=['POST'])
def process_request():
    # Extract data from the JSON payload
    data = request.json
    account_lens_handle = data.get('accountLensHandle')
    prompt = data.get('prompt')

    # Process the data and generate a response
    # Replace the following lines with your own logic
    response_type = 'example'
    response_data = {'accountLensHandle': account_lens_handle, 'prompt': prompt}

    # Create the JSON response
    response = {'type': response_type, 'data': response_data }
    return jsonify(response)

if __name__ == '__main__':
    app.run(host='localhost', port=4000)