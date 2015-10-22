var CartBox = React.createClass({
	getInitialState: function(){
		return {data: []};
	},
	render: function(){
		return (
			<div>
				{this.state.data}
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

// var CartList = React.createClass({
// 	render: function(){
// 		var items = this.props.data.map(function (item, index){
// 			return (
// 				<CartItem key={index} cart_name={item.name} cart_price={item.price} />
// 			);
// 		});

// 		var className = "table"

// 		return (
// 			<table className={className}>
// 				<thead>
// 					<tr>
// 						<td>Name</td>
// 						<td>Quantity</td>
// 					</tr>
// 				</thead>
// 				{items}
// 			</table>
// 		);
// 	}
// });

// var CartItem = React.createClass({
// 	render: function(){
// 		return (
// 			<tr>
// 				<td>{this.props.cart_name}</td>
// 				<td>{this.props.cart_quantity}</td>
// 			</tr>
// 		);
// 	}
// });