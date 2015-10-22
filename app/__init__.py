from flask import Flask
from modules import inventory

app = Flask(__name__)

app.register_blueprint(inventory.invroute)