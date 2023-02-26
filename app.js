// import React, { useState, useEffect } from 'react';

// let productList = document.getElementById("productList");

// let Products = () => 
// {
//     const [products, setProduct] = useState(
//         {id:0, name:"Burger", price:595},
//         {id:1, name:"CBO", price:895},
//         {id:3, name:"Filet O Fish", price:395} 
//     )

//     return(
//         productList.render(products.forEach(element => {
//             <li className="
//             group
//             inline-block pb-4 bg-gradient-to-tr from-purple-600 to-orange-400 text-white overflow-hidden rounded-2xl shadow
//             hover:shadow-md
//             transition mx-12 my-6
//             "> 
//             <figure className="max-h-32 aspect-square overflow-hidden">
//                 <img 
//                 className="w-full h-full object-cover transition group-hover:scale-125"
//                 src="https://images.unsplash.com/photo-1649168916853-8bdb50116941?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0OTQ0MzY5Nw&ixlib=rb-1.2.1&q=80&w=400"
//                 />
//             </figure>
//             <div>
//                 {element.name}
//             </div>
//             <div>
//                 {element.price}€
//             </div>
//             </li>          
//         }))
// )}

// ReactDOM.hydrate(<Products />, document.getElementById("productList"))

const Product = (props) =>
<li className="
    group
    inline-block pb-4 bg-gradient-to-tr from-purple-600 to-orange-400 text-white overflow-hidden rounded-2xl shadow
    hover:shadow-md
    transition mx-12 my-6
  " onClick={() => props.onClick(props.id)}>
    <figure className="w-full aspect-square overflow-hidden relative">
        <img 
           className="w-full h-full object-cover transition group-hover:scale-125 absolute"
           src="https://images.unsplash.com/photo-1649168916853-8bdb50116941?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0OTQ0MzY5Nw&ixlib=rb-1.2.1&q=80&w=400"
        />
        <img
            className="w-full h-full object-cover transition opacity-0 group-hover:opacity-80 group-hover:z-10 absolute"
            src="loltest.png"
        />
    </figure>
    <div className="mx-6">
        <div>
        {props.name}
        </div>
        <div>
            {props.price}€
        </div>
    </div>

</li>

const Order = (props) =>
<li className="
    group
    inline-block pb-10 bg-gradient-to-tr from-purple-600 to-orange-400 text-white overflow-hidden rounded-2xl shadow
    hover:shadow-md
    transition mx-12 my-6 w-48 h-86
  " onClick={() => props.onClick(props.id)}> 
    <figure className="w-full aspect-square overflow-hidden relative">
        {/* <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1649168916853-
        8bdb50116941?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx
        8fHx8MTY0OTQ0MzY5Nw&ixlib=rb-1.2.1&q=80&w=400')] object-cover transition 
        group-hover:scale-125">
            <img
            className="w-full h-full object-cover transition invisible group-hover:visible"
            src="loltest.png"
            />
        </div> */}
        <img 
           className="w-full h-full object-cover transition group-hover:scale-125 absolute"
           src="https://images.unsplash.com/photo-1649168916853-8bdb50116941?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0OTQ0MzY5Nw&ixlib=rb-1.2.1&q=80&w=400"
        />
        <img
            className="w-full h-full object-cover transition opacity-0 group-hover:opacity-80 group-hover:z-10 absolute"
            src="loltest.png"
        />
    </figure>
    <div className="mx-6 w-[1/2]">
        <div>
            {props.name}
        </div>
        <div>
            {props.price}€
        </div>
        <div>
            {props.count}
        </div>
    </div>
</li>

const TotalPrice = (props) =>
{
    <div>
        {props.total}€
    </div>
}



class App extends React.Component
{
    constructor(props)
    {
        super(props),
        this.state = {
            products: [
                {id:0, name:"Burger", price:595, count:1},
                {id:1, name:"CBO", price:895 ,count:1},
                {id:2, name:"Filet O Fish", price:395, count:1},               
            ],
            orders : [],
            totalPrice : 0
        }
    }

    onAddProduct = (id) =>
    {
        console.log(id)
        let product = this.state.products.find((element) => id == element.id)
        if(product != undefined)
        {
            if(product != this.state.orders.find((p) => p == product))
            {
                let orderCopy = [...this.state.orders]
                orderCopy.push(product)
                this.setState({orders: orderCopy})
            }
            else
            {
                let orderCopy = [...this.state.orders]
                let orderIndex = orderCopy.findIndex((p) => p == product );
                orderCopy[orderIndex].count += 1;
                this.setState({orders: orderCopy})
            }
            this.setPrice(product.price);
        }
    }

    onRemoveProduct = (id) =>
    {
        console.log(id)
        let product = this.state.orders.find((element) => id == element.id)
        if(product != undefined)
        {
            if(product.count >= 2)
            {
                let orderCopy = [...this.state.orders]
                let orderIndex = orderCopy.findIndex((p) => p == product );
                orderCopy[orderIndex].count -= 1;
                this.setState({orders: orderCopy})
            }
            else
            {
                let orderCopy = [...this.state.orders]
                let orderIndex = orderCopy.findIndex((p) => p == product );
                let removedOrder = orderCopy.splice(orderIndex, 1);
                console.log(removedOrder)
                this.setState({orders: orderCopy})
            }
            this.setPrice(-product.price);
        }
    }

    setPrice = (price) =>
    {
        let oldTotal = this.state.totalPrice; 
        this.setState({totalPrice : oldTotal + price})
    }

    render() 
    {

        let productItems = this.state.products.map((p) =>
        <Product key={p.id} name={p.name} id={p.id}
        price={(p.price /100).toLocaleString(undefined, {minimumFractionDigits:2})} 
        onClick={() => this.onAddProduct(p.id)}/>);
        
        let orderItems = this.state.orders.map((p) =>
        <Order key={p.id} name={p.name}  count={p.count}
        price={(p.price /100).toLocaleString(undefined, {minimumFractionDigits:2})}
        onClick={() => this.onRemoveProduct(p.id)}/>);

        let finalTotal = this.state.totalPrice / 100

        return(
            <section id="productApp" className="flex justify-between px-12 text-center">
            <div id="productSection" className="grid w-1/2">
                <h1> Menu pour VOUS !</h1>
                <ul id="productList">
                {productItems}
                </ul>
            </div>
            <div id="orderSection" className="mx-12 w-1/3">
                <h1>Vos Commandes</h1>
                <ul id="orderList">
                {orderItems}
                </ul>
                <div id="totalPrice">
                {finalTotal.toLocaleString(undefined, {minimumFractionDigits:2})}€
                </div>
            </div>
            </section>
        )
    }
}

ReactDOM.hydrate(<App />, document.getElementById("app"))



