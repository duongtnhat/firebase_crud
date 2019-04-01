from flask import Flask, request
app = Flask(__name__)

@app.route("/", methods=['GET'])
def get_data():
    with open('data.xml', 'r') as file:
        data = file.read()
        return data


@app.route("/", methods=['POST'])
def save_data():
    data = request.data
    with open('data.xml', 'wb') as file:
        file.write(data)
        return ""

app.run()
