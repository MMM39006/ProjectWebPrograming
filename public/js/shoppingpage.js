window.onload = pageLoad;

function pageLoad(){
	ReadData();
	document.getElementById('HeaderTextMenubar').onclick = ReadData;
	document.getElementById('MenuProductCPU').onclick = ReadDataCpu;
	document.getElementById('MenuProductMainboard').onclick = ReadDataMainboard;
	document.getElementById('MenuProductVGA').onclick = ReadDataVGA;
	document.getElementById('MenuProductMemory').onclick = ReadDataMenory;
	document.getElementById('MenuProductHarddisk').onclick = ReadDataHarddisk;
	document.getElementById('MenuProductPowerSuply').onclick = ReadDataPowerSuply;
	document.getElementById('MenuProductCase').onclick = ReadDataCase;
	// document.getElementById('displayPic').onclick = fileUpload;
	// document.getElementById('fileField').onchange = fileSubmit;
	
	// var username = getCookie('username');

	// document.getElementById("username").innerHTML = username;
	// console.log(getCookie('img'));
	// showImg('img/'+getCookie('img'));
	// readPost();
}

async function TestDaata(){
	console.log(GetValue.value);
}

async function GetValue(){
	document.getElementById();
}

async function ReadData(){
	const DataPost = await fetch('/readPost');
	const Data = await DataPost.json();
	showPost(Data);
}

async function ReadDataCpu(){
	const DataPost = await fetch('/readDataCpu');
	const Data = await DataPost.json();
	showPost(Data);
}

async function ReadDataMainboard(){
	const DataPost = await fetch('/readDataMainboard');
	const Data = await DataPost.json();
	showPost(Data);
}

async function ReadDataVGA(){
	const DataPost = await fetch('/readDataVGA');
	const Data = await DataPost.json();
	showPost(Data);
}

async function ReadDataMenory(){
	const DataPost = await fetch('/readDataMenory');
	const Data = await DataPost.json();
	showPost(Data);
}

async function ReadDataHarddisk(){
	const DataPost = await fetch('/readDataHarddisk');
	const Data = await DataPost.json();
	showPost(Data);
}

async function ReadDataPowerSuply(){
	const DataPost = await fetch('/readDataPowerSuply');
	const Data = await DataPost.json();
	showPost(Data);
}

async function ReadDataCase(){
	const DataPost = await fetch('/readDataCase');
	const Data = await DataPost.json();
	showPost(Data);
}

function showPost(data){
	var keys = Object.keys(data);
	var divTag = document.getElementById("Product");

	divTag.innerHTML = "";
	for (var i = keys.length-1; i >=0 ; i--) {

		var temp = document.createElement("div");
		temp.className = "ProductDetail";
		temp.id = data[keys[i]]["id"];
		divTag.appendChild(temp);

		var temp1 = document.createElement("div");
		temp1
		temp1.className = "Name";
		temp1.innerHTML = data[keys[i]]["name"];
		temp.appendChild(temp1);

		var temp1 = document.createElement("img");
		temp1.className = "ProductPicture"
		temp.appendChild(temp1);
		// console.log(data[keys[i]]["img"]);
		temp1.src = "img/"+data[keys[i]]["img"];
		temp.appendChild(temp1);

		var temp1 = document.createElement("div");
		temp1.className = "Price";
		temp1.innerHTML = "Price:  "+data[keys[i]]["price"];
		temp.appendChild(temp1);

		var temp2 = document.createElement("form");
		temp2.name = "Cart";
		temp2.action = '/AddItemToCart'
		temp2.method ="post"
		temp.appendChild(temp2);
		
		var temp4 = document.createElement("input")
		temp4.type = "hidden"
		temp4.name = "name";
		temp4.value = data[keys[i]]["name"];
		temp2.appendChild(temp4);
		
		var temp4 = document.createElement("input")
		temp4.type = "hidden"
		temp4.name = "img"
		temp4.value = data[keys[i]]["img"];
		temp2.appendChild(temp4);

		var temp4 = document.createElement("input")
		temp4.type = "hidden"
		temp4.name = "price"
		temp4.value = data[keys[i]]["price"];
		temp2.appendChild(temp4);

		var temp3 = document.createElement("button");
		temp3.type ="submit"
		temp3.innerHTML = "Add To Card";
		temp2.appendChild(temp3);

		// var temp5 = document.createElement("a");
		// temp5.href = "Cart.html";
		// temp3.appendChild(temp5);

		temp1.innerHTML ="Price : " +data[keys[i]]["price"];
		temp.appendChild(temp1);

		// <input type = "hidden" name="cloth_name" value="{{clothe[0]}}">
        //             <input type = "hidden" name="price" value="{{clothe[1]}}">
        //             <input type = "hidden" name="file_location" value="{{clothe[2]}}">
        //             <button type ="submit" class = "btn">
        //                 <a class="btn btn-outline-dark btn-square"><i class="fa fa-shopping-cart"></i></a>
        //             </button>

	}

}