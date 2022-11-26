function checkCookie(){
	var username = "";
	if(getCookie("username")==false){
		window.location = "login.html";
	}
}
checkCookie();
window.onload = pageLoad;

function pageLoad(){
    // let queryString = window.location.search;
    // let urlParams = new URLSearchParams(queryString);
    // let name = urlParams.get('name')
	// if(name != null){
	// 	getDataFormurl()
	// }
	// console.log(getCookie('username'));


	GetCartItemdata();
	GetInfoCustomer();
	// console.log(GetInfoCustomer);
}

function getCookie(name){
	var value = "";
	try{
		value = document.cookie.split("; ").find(row => row.startsWith(name)).split('=')[1]
		return value
	}catch(err){
		return false
	} 
}

// function getDataFormurl(){
//     let queryString = window.location.search;
//     console.log(queryString);

//     let urlParams = new URLSearchParams(queryString);
//     let name = urlParams.get('name')
//     console.log(name);

//     let img = urlParams.get('img')
//     console.log(img);

//     let price = urlParams.get('price')
//     console.log(price);

//     // GetData(name);
// 	GetData(name,img,price);
// }

// async function GetData(name){
// 	const DataPost = await fetch('/GetItemData');
// 	const Data = await DataPost.json(name);
// }

// async function GetData(name,img,price){
// 	let response = await fetch("/getData",{
// 		method: "POST",
// 		headers: {
// 			'Accept': 'application/json',
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify({
// 			name:name,
// 			img:img,
// 			price:price
// 		})
// 	});
// 	let data = await response.json();
// 	console.log(data);
// }

async function GetCartItemdata(){
	const DataPost = await fetch('/GetCartData');
	const Data = await DataPost.json();
	// console.log(Data);
	showPost(Data);
}

function showPost(data){
	// console.log(data);
	var keys = Object.keys(data);
	var divTag = document.getElementById("MyCart");
	divTag.innerHTML = "";

	for (var i = keys.length-1; i >=0 ; i--) {

		var table = document.createElement("table");
		table.id = "CartData"
		table.className = "cart-page cart-page";
		divTag.appendChild(table);

		var tr = document.createElement("tr");
		table.appendChild(tr);

		var td = document.createElement("td");
		tr.appendChild(td);
		
		var divinfo = document.createElement("div");
		divinfo.className = "cart-info"
		td.appendChild(divinfo);

		var img = document.createElement("img");
		img.className = "image-cart";
		img.src = "img/"+data[keys[i]]["img"];
		divinfo.appendChild(img);

		var divDetail = document.createElement("div");
		divDetail.className = "product-detail";
		divinfo.appendChild(divDetail);

		var name = document.createElement("p");
		name.innerHTML = data[keys[i]]["name"];
		divDetail.appendChild(name);
		
		var price = document.createElement("small");
		price.innerHTML = "Price : "+data[keys[i]]["price"];
		divDetail.appendChild(price);

		var br = document.createElement("br");
		divDetail.appendChild(br);
		
		// var button = document.createElement("button");
		// divDetail.appendChild(button);

		// var remove = document.createElement("a");
		// remove.innerHTML = "Remove";
		// button.appendChild(remove);

		// var td2 = document.createElement("td");
		// tr.appendChild(td2);

		var input = document.createElement("h3")
		input.id = "quanityinput";
		// input.type = "number"
		input.innerHTML ="x " + data[keys[i]]["quantity"];
		tr.appendChild(input);

		// var formnumber = document.createElement("form");
		// formnumber.oninput;
		// formnumber.action = '/UpdateQuantity';
		// divinfo.appendChild(formnumber);


		var td3 = document.createElement("td")
		td3.id="totalPrice";
		td3.innerHTML = data[keys[i]]["price"]* data[keys[i]]["quantity"];
		tr.appendChild(td3);

		var form = document.createElement("form");
		form.name = "Cart";
		form.action = '/removeitem'
		form.method = "post"
		divinfo.appendChild(form);
		
		var namedata = document.createElement("input");
		namedata.type = "hidden"
		namedata.name = "name";
		namedata.value = data[keys[i]]["name"];
		form.appendChild(namedata);

		var imgdata = document.createElement("input");
		imgdata.type = "hidden"
		imgdata.name = "img";
		imgdata.value = data[keys[i]]["img"];
		form.appendChild(imgdata);

		var pricedata = document.createElement("input")
		pricedata.type = "hidden"
		pricedata.name = "price"
		pricedata.value = data[keys[i]]["price"];
		form.appendChild(pricedata);

		var remove = document.createElement("button");
		remove.type ="submit"
		// remove.onclick = TestDaata;
		remove.innerHTML = "Remove";
		form.appendChild(remove);
	}

}

async function GetInfoCustomer(){
	const DataPost = await fetch('/GetinfoUser');
	const DataPrice = await fetch('/GetCartPrice');
	const Data = await DataPost.json();
	const Datacart = await DataPrice.json();

	console.log(Datacart);
	InfoCheckOut(Data,Datacart);
}

function InfoCheckOut(data,price){
	var keys = Object.keys(data);
	var pricekeys = Object.keys(price);
	var TotalPice = 0;
	var divname = document.getElementById("CustomerName");
	divname.innerHTML = data[keys[0]]["firstname"] + " " + data[keys[0]]["lastname"];

	var divprice = document.getElementById("TotalPrice");
	for(var i =0; i<pricekeys.length;i++){
		var newprice = price[pricekeys[i]]["price"] * price[pricekeys[i]]["quantity"];
		console.log(newprice)
		TotalPice += newprice;
	}
	divprice.innerHTML =TotalPice;

	var buttonCheckout = document.getElementById("ButtonCheckout");

	var formbuttom = document.createElement("form");
	formbuttom.action = ('/checkout');
	buttonCheckout.appendChild(formbuttom);

	var checkoutButton = document.createElement("button")
	checkoutButton.innerHTML = "Check Out";
	checkoutButton.type ="submit"
	formbuttom.appendChild(checkoutButton);

}