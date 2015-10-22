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
		return {data: []};
	},
	componentDidMount: function(){
		this.loadItemsFromServer();
	},
	render: function(){
		return (
			<div>
				<ItemList data={this.state.data} />
				<ItemForm onAddItemSubmit={this.handleAddItemSubmit} />
			</div>
		);
	}
});

var ItemList = React.createClass({
	render: function(){
		var items = this.props.data.map(function (item, index){
			return (
				<Item key={index} item_name={item.name} item_price={item.price} />
			);
		});

		var className = "table"

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
	addItemToCart: function(cart_item){
		$.ajax({
			url: '/addcart',
			dataType: 'json',
			type: 'POST',
			data: cart_item,
			success: function(data){
				var cartDict = JSON.parse(JSON.stringify(data));
				this.setState({data: cartDict['cart_items']});//Change this line for add to cart
			}.bind(this),
			error: function(xhr, status, err){
				alert(this.props.url + status + err.toString());
			}.bind(this)
		});
	},
	addToCart: function(e){
		e.preventDefault();
		var form = e.target;
		var pname = form.pname.value.trim();
		var price = form.price.value.trim();
		var quantity = form.quantity.value.trim();

		if(!pname || !price || !quantity){
			return;
		}

		this.addItemToCart({name: pname, price: price, quantity: quantity});

		form.pname.value = '';
		form.price.value = '';
		form.quantity.value = '';

		return;
	},
	render: function(){
		return (
			<form onSubmit={this.addToCart}>
				<input type="hidden" name="pname" value={this.props.item_name} />
				<input type="hidden" name="price" value={this.props.item_price} />
				<label>{this.props.item_name}</label>
				<label>{this.props.item_price}</label>
				<input type="text" name="quantity" />
				<button type="submit">Add to cart</button>
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




