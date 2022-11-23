window.onload = pageLoad;

function pageLoad(){
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let name = urlParams.get('name')
	if(name != null){
		getData()
	}

	GetCartItemdata();
}

function getData(){
    let queryString = window.location.search;
    console.log(queryString);

    let urlParams = new URLSearchParams(queryString);
    let name = urlParams.get('name')
    console.log(name);

    let img = urlParams.get('img')
    console.log(img);

    let price = urlParams.get('price')
    console.log(price);

    // GetData(name);
	GetData(name,img,price);
}

// async function GetData(name){
// 	const DataPost = await fetch('/GetItemData');
// 	const Data = await DataPost.json(name);
// }

async function GetData(name,img,price){
	let response = await fetch("/getData",{
		method: "POST",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name:name,
			img:img,
			price:price
		})
	});
	let data = await response.json();
	console.log(data);
}

async function GetCartItemdata(){
	const DataPost = await fetch('/GetCartData');
	const Data = await DataPost.json();
	console.log(Data);
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
		td.appendChild(divinfo);;

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
		
		var button = document.createElement("button");
		divDetail.appendChild(button);

		var remove = document.createElement("a");
		remove.innerHTML = "Remove";
		button.appendChild(remove);

		var td2 = document.createElement("td");
		tr.appendChild(td2);

		var input = document.createElement("input")
		input.type = "number"
		input.value = "5";
		tr.appendChild(input);

		var td3 = document.createElement("td")
		td3.innerHTML = "500"
		tr.appendChild(td3);


	}

}