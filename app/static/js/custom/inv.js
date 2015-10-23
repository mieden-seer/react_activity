var InventoryBox = React.createClass({
	loadItemsFromServer: function(){
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data){
				var itemDict = JSON.parse(JSON.stringify(data));
				this.setState({data: itemDict['items']});
			}.bind(this),
			error: function(xhr, status, error){
				alert(this.props.url + status + error.toString());
			}.bind(this)
		});

		$.ajax({
			url: this.props.add_url,
			dataType: 'json',
			cache: false,
			success: function(data){
				var itemDict = JSON.parse(JSON.stringify(data));
				this.setState({cart_data: itemDict['cart_items']});
			}.bind(this),
			error: function(xhr, status, error){
				alert(this.props.url + status + error.toString());
			}.bind(this)
		});
	},
	handleAddItemSubmit: function(new_item){
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: new_item,
			success: function(data){
				var itemDict = JSON.parse(JSON.stringify(data));
				this.setState({data: itemDict['items']});
			}.bind(this),
			error: function(xhr, status, err){
				alert(this.props.url + status + err.toString());
			}.bind(this)
		});
	},
	getInitialState: function(){
		return {data: [], cart_data: []};
	},
	componentDidMount: function(){
		this.loadItemsFromServer();
	},
	addItemsOnCart: function(cart_item){
		$.ajax({
			url: this.props.add_url,
			dataType: 'json',
			type: 'POST',
			data: cart_item,
			success: function(data){
				var cartDict = JSON.parse(JSON.stringify(data));
				this.setState({cart_data: cartDict['cart_items']});//Change this line for add to cart
			}.bind(this),
			error: function(xhr, status, err){
				alert(this.props.add_url + status + err.toString());
			}.bind(this)
		});
	},
	render: function(){
		return (
			<div>
				<ItemList data={this.state.data} addItemTCart={this.addItemsOnCart} />
				<ItemForm onAddItemSubmit={this.handleAddItemSubmit} />
				<CartBox cart_data={this.state.cart_data} />
			</div>
		);
	}
});

var ItemList = React.createClass({
	addC: function(cart_item){
		this.props.addItemTCart(cart_item);
	},
	render: function(){
		var items = this.props.data.map(function (item, index){
			return (
				<Item key={index} item_name={item.name} item_price={item.price} addItemToCart={this.addC} />
			);
		}.bind(this));

		return (
			<div>
				{items}
			</div>

			// <table className={className}>
			// 	<thead>
			// 		<tr>
			// 			<td>Name</td>
			// 			<td>Price</td>
			// 			<td>Quantity</td>
			// 		</tr>
			// 	</thead>
			// 	{items}
			// </table>
		);
	}
});

var Item = React.createClass({
	addToCart: function(e){
		e.preventDefault();
		var form = e.target;
		var pname = form.pname.value.trim();
		var price = form.price.value.trim();
		var quantity = form.quantity.value.trim();

		if(!pname || !price || !quantity){
			return;
		}

		this.props.addItemToCart({name: pname, price: price, quantity: quantity});

		form.pname.value = '';
		form.price.value = '';
		form.quantity.value = '';

		return;
	},
	render: function(){
		return (
			<form onSubmit={this.addToCart} role="form" className="form-horizontal">
				<div className="form-group">
					<label className="control-label col-sm-2">{this.props.item_name}</label>
					<div className="col-sm-10">
						<input type="hidden" name="pname" value={this.props.item_name} />
					</div>

					<label className="control-label col-sm-2">{this.props.item_price}</label>
					<div className="col-sm-10">
						<input type="hidden" name="price" value={this.props.item_price} />
					</div>


					<input type="text" name="quantity" />
					<button className="btn btn-warning" type="submit">Add to cart</button>
				</div>
			</form>
			// <tr>
			// 	<td>{this.props.item_name}</td>
			// 	<td>{this.props.item_price}</td>
			// 	<td><input type='text' /></td>
			// </tr>
		);
	}
});

var ItemForm = React.createClass({
	handleSubmit: function(e){
		e.preventDefault();
		var form = e.target;
		var pname = form.pname.value.trim();
		var price = form.price.value.trim();

		if(!pname || !price){
			return;
		}

		this.props.onAddItemSubmit({name: pname, price: price});
		form.pname.value = '';
		form.price.value = '';
		return;
	},
	render: function(){
		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text" placeholder="Item name" name="pname" />
				<input type="text" placeholder="Item price" name="price" />
				<input type="submit" value="Add item" />
			</form>
		);
	}
});




