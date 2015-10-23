var CartBox = React.createClass({
	render: function(){
		return (
			<div>
				<CartList data={this.props.cart_data} />
			</div>
		);
	}
});

// var CartBox = React.createClass({
// 	render: function(){
// 		return (
// 			<div>
// 				<ItemList data={this.props.data} />
// 			</div>
// 		);
// 	}
// });

var CartList = React.createClass({
	render: function(){
		var items = this.props.data.map(function (item, index){
			return (
				<CartItem key={index} cart_name={item.name} cart_price={item.price} cart_quantity={item.quantity} sub={item.subtotal} total={item.total} />
			);
		});

		var className = "table"

		return (
			<table className={className}>
				<thead>
					<tr>
						<td>Name</td>
						<td>Quantity</td>
						<td>Price</td>
						<td>Subtotal</td>
					</tr>
				</thead>
				<tbody>
					{items}
				</tbody>
			</table>
		);
	}
});

var CartItem = React.createClass({
	render: function(){
		return (
			<tr>
				<td>{this.props.cart_name}</td>
				<td>{this.props.cart_quantity}</td>
				<td>{this.props.cart_price}</td>
				<td>{this.props.sub}</td>
			</tr>
		);
	}
});