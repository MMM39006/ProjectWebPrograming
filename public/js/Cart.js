window.onload = pageLoad;

function pageLoad(){
	getData();
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

	let id = urlParams.get('id')
    console.log(id);

    // GetData(name);
	GetData(name,img,price,id);
}

// async function GetData(name){
// 	const DataPost = await fetch('/GetItemData');
// 	const Data = await DataPost.json(name);
// }

async function GetData(name,img,price,id){
	let response = await fetch("/getData",{
		method: "POST",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			id:id,
			name:name,
			img:img,
			price:price
		})
	});
	let data = await response.json();
	console.log(data);
}