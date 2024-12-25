let title = document.getElementById("title");
let price = document.getElementById("price");
let taxs = document.getElementById("taxs");
let total = document.getElementById("total");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let categroy = document.getElementById("categroy");
let btnCreate = document.getElementById("btncreate");
let mood = "Creat New Product ";
let tbl = "";

// get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxs.value + +ads.value - discount.value;
    total.innerHTML = result;
  } else {
    total.innerHTML = "";
  }
}

let dataProduct = [];
//  create pruduct
if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}

btnCreate.onclick = function () {
  let newProduct = {
    Title: title.value.toLowerCase(),
    Price: price.value,
    Taxs: taxs.value,
    Ads: ads.value,
    Discount: discount.value,
    Total: total.innerHTML,
    Count: count.value,
    Categroy: categroy.value.toLowerCase(),
  };
  // count
  if (
    title.value != "" &&
    price.value != "" &&
    categroy.value != "" &&
    newProduct.Count < 100
  ) {
    if (mood === "Creat New Product ") {
      if (newProduct.Count > 1) {
        for (let i = 0; i < newProduct.Count; i++) {
          dataProduct.push(newProduct);
        }
      } else {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct[tbl] = newProduct;
      mood = "Creat New Product ";
      btnCreate.innerHTML = "Creat New Product ";
      count.style.display = "block";
    }
  } else {
    clearData();
  }

  // save in localStorage
  localStorage.setItem("product", JSON.stringify(dataProduct));
  clearData();
  showProduct();
};

// read
function showProduct() {
  let table = "";

  for (let i = 0; i < dataProduct.length; i++) {
    table += `
               <tr>
            <td> ${i + 1}</td>
            <td>${dataProduct[i].Title}</td>
            <td>${dataProduct[i].Price}</td>
            <td>${dataProduct[i].Taxs}</td>
            <td>${dataProduct[i].Ads}</td>
            <td>${dataProduct[i].Discount}</td>
            <td>${dataProduct[i].Total}</td>
            <td>${dataProduct[i].Categroy}</td>
            <td>
              <button class="btn btn-outline-info rounded-pill" onclick="updateProduct(${i});">Update</button>
            </td>
            <td>
              <button class="btn btn-outline-danger rounded-pill" onclick="deleteProduct(${i})">
                Delete
              </button>
            </td>
          </tr>
            `;
  }

  //  create btn delete all
  document.getElementById("show").innerHTML = table;
  let btnDeleteAll = document.getElementById("deleteall");
  if (dataProduct.length > 0) {
    btnDeleteAll.innerHTML = `
        <button
        onclick= " deleteAll()"
          class="btn btn-outline-info w-100 rounded-pill"
          style="height: 40px !important">
          Delete All  ( ${dataProduct.length})
        </button>
        `;
  } else {
    btnDeleteAll.innerHTML = "";
  }
}

showProduct();
// clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxs.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  categroy.value = "";
}

// delete
function deleteProduct(index) {
  dataProduct.splice(index, 1);
  localStorage.product = JSON.stringify(dataProduct);
  showProduct();
}

// func deleteAll
function deleteAll() {
  localStorage.clear();
  dataProduct.splice(0);
  showProduct();
}
// update product
function updateProduct(index) {
  title.value = dataProduct[index].Title;
  price.value = dataProduct[index].Price;
  taxs.value = dataProduct[index].Taxs;
  ads.value = dataProduct[index].Ads;
  discount.value = dataProduct[index].Discount;
  getTotal();
  count.style.display = "none";
  categroy.value = dataProduct[index].Categroy;
  mood = "Update  Product";
  btnCreate.innerHTML = " Update  Product ";
  tbl = index;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search
let searchMood = "title";

function getSearchMood(id) {
  let inpSearch = document.getElementById("inpSearch");
  if (id == "Title") {
    searchMood = "title";
    inpSearch.placeholder = " Search By Title ";
  } else {
    searchMood = "Categroy";
    inpSearch.placeholder = " Search By Categroy  ";
  }
  inpSearch.focus();
  inpSearch.value = "";
  showProduct();
}

function getDataSearch(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < dataProduct.length; i++) {
      if (dataProduct[i].Title.includes(value.toLowerCase())) {
        table += `
                <tr>
             <td> ${i + 1}</td>
             <td>${dataProduct[i].Title}</td>
             <td>${dataProduct[i].Price}</td>
             <td>${dataProduct[i].Taxs}</td>
             <td>${dataProduct[i].Ads}</td>
             <td>${dataProduct[i].Discount}</td>
             <td>${dataProduct[i].Total}</td>
             <td>${dataProduct[i].Categroy}</td>
             <td>
               <button class="btn btn-outline-info rounded-pill" onclick="updateProduct(${i});">Update</button>
             </td>
             <td>
               <button class="btn btn-outline-danger rounded-pill" onclick="deleteProduct(${i})">
                 Delete
               </button>
             </td>
           </tr>
             `;
      }
    }
  } else {
    for (let i = 0; i < dataProduct.length; i++) {
      if (dataProduct[i].Categroy.includes(value)) {
        table += `
                  <tr>
               <td> ${i + 1}</td>
               <td>${dataProduct[i].Title}</td>
               <td>${dataProduct[i].Price}</td>
               <td>${dataProduct[i].Taxs}</td>
               <td>${dataProduct[i].Ads}</td>
               <td>${dataProduct[i].Discount}</td>
               <td>${dataProduct[i].Total}</td>
               <td>${dataProduct[i].Categroy}</td>
               <td>
                 <button class="btn btn-outline-info rounded-pill" onclick="updateProduct(${i});">Update</button>
               </td>
               <td>
                 <button class="btn btn-outline-danger rounded-pill" onclick="deleteProduct(${i})">
                   Delete
                 </button>
               </td>
             </tr>
               `;
      }
    }
  }
  document.getElementById("show").innerHTML = table;
}
