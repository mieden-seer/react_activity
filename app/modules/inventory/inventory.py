from flask import Blueprint
from flask import render_template
from flask import jsonify
from flask import request

invroute = Blueprint('inventory', __name__)

@invroute.route('/')
def index():
	return render_template('index.html')

items = [
	{
		'name': 'Bag',
		'price': 10
	},
	{
		'name': 'Shoes',
		'price': 50
	}        
]

cart_items = []

@invroute.route('/getproducts', methods=['GET','POST'])
def get_sample_data():
    if request.method=='POST':
        items.append({
            'name':request.form['name'], 
            'price':request.form['price']
        })
    return jsonify(items=items)

@invroute.route('/addcart', methods=['POST'])
def add_to_cart():
	item = {
		'name': request.form['name'],
		'price': request.form['price'],
		'quantity': int(request.form['quantity'])
	}

	for c in cart_items:
		if(c['name'] == item['name']):
			c['quantity'] += int(item['quantity'])
			break
	else:
		cart_items.append(item)

	return jsonify(cart_items=cart_items)



