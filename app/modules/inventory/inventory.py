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
total_price = 0

@invroute.route('/getproducts', methods=['GET','POST'])
def get_sample_data():
    if request.method=='POST':
        items.append({
            'name':request.form['name'], 
            'price':request.form['price']
        })
    return jsonify(items=items)

@invroute.route('/addcart', methods=['GET', 'POST'])
def add_to_cart():
	if request.method=='POST':
		item = {
			'name': request.form['name'],
			'price': request.form['price'],
			'quantity': int(request.form['quantity']),
			'subtotal': 0,
			'total': 0 
		}

		global total_price

		for c in cart_items:
			print total_price
			if(c['name'] == item['name']):
				c['quantity'] += int(item['quantity'])
				c['subtotal'] += int(item['quantity']) * int(item['price'])
				total_price += int(item['quantity']) * int(item['price'])
				c['total'] = total_price		
				break
		else:
			item['subtotal'] = int(item['price']) * int(item['quantity'])
			total_price += item['subtotal']
			item['total'] = total_price
			cart_items.append(item)

	return jsonify(cart_items=cart_items)



