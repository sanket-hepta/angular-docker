const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const fs = require("fs");

const app = express();
dotenv.config();

// app.use((request, response, next) => {
//     response.header('Access-Control-Allow-Origin', '*');
//     next();
// });

app.use(express.json());
app.use(cors());

//http://localhost:3000/sayHello
app.get("/sayHello", (request, response) => {
    response.send("Welcome to simple rest API in Text Format")
});

//http://localhost:3000/sayJson
app.get("/sayJson", (request, response) => {
    response.json({"message" : "Welcome to simple rest API in JSON Format"});
});

//http://localhost:3000/getProductInfo
let product = {pid: 100, pname: "TV", price: 450000, image_url:'https://images-eu.ssl-images-amazon.com/images/I/513O7azmIkL._SY300_SX300_QL70_FMwebp_.jpg'}; //define object in js literal style
app.get("/getProductInfo", (request, response) => {
    response.json(product); //automatically convert js into json format
});

//http://localhost:3000/allProducts
let products = JSON.parse(fs.readFileSync("product.json"));
app.get("/allProducts", (request, response) => {
    response.json(products); //automatically convert js into json format
});

//http://localhost:3000/singleQueryParam?name=Jhon
app.get("/singleQueryParam", (request, response) => {
    response.json( {"message": `Welcome to REST API ${request.query.name}`});
});

//http://localhost:3000/multipleQueryParam?name=Jhon&password=123
app.get("/multipleQueryParam", (request, response) => {
    let name = request.query.name;
    let password = request.query.password;
    if(name == 'Jhon' && password == '123'){
        response.json({"message": "Successfully Login"});
    }else{
        response.json({"message": "Invalid username or password"});
    }
});


//http://localhost:3000/singleValueParam/Smith
app.get("/singleValueParam/:name", (request, response) => {
    response.json( {"message": `Welcome to REST API using path param ${request.params.name}`});
});

//http://localhost:3000/multipleValueParam/Jhon/123
app.get("/multipleValueParam/:name/:password", (request, response) => {
    let name = request.params.name;
    let password = request.params.password;
    if(name == 'Jhon' && password == '123'){
        response.json({"message": "Successfully Login"});
    }else{
        response.json({"message": "Invalid username or password"});
    }
});

//http://localhost:3000/findProductById/100
app.get("/findProductById/:id", (request, response) => {
    let pid = request.params.id;
    let result = products.find(product => product.pid == pid);
    if(result){
        response.json( {"status": true, "message": "Success", "data": result});
    }else{
        response.json( {"status": false, "message": "No data found"});
    }
    
});

//http://localhost:3000/saveProduct
app.post("/saveProduct", (request, response) => {
    let product = request.body;
    let result = products.find(p => p.pid == product.pid);
    if(!result){
        products.push(product);
        fs.writeFileSync("product.json",JSON.stringify(products));
        response.json( {"status": true, "message": "Product added successfully.", "data": products});
    }else{
        response.json( {"status": false, "message": "Product ID must be unique."});
    }
});

//http://localhost:3000/deleteProduct/101
app.delete("/deleteProduct/:id", (request, response) => {
    let pid = request.params.id;
    let index = products.findIndex(p => p.pid == pid);
    if(index < 0){
        response.json( {"status": false, "message": "Invalid Product ID."});
    }else{
        products.splice(index, 1);
        fs.writeFileSync("product.json",JSON.stringify(products));
        response.json( {"status": true, "message": "Product deleted successfully", "data": products});
    }
});

//http://localhost:3000/updateProduct
app.patch("/updateProduct", (request, response) => {
    let updateProduct = request.body;
    let index = products.findIndex(p => p.pid == updateProduct.pid);
    if(index < 0){
        response.json( {"status": false, "message": "Invalid Product ID."});
    }else{
        products[index].price = updateProduct.price;
        fs.writeFileSync("product.json",JSON.stringify(products));
        response.json( {"status": true, "message": "Product price updated successfully", "data": products});
    }
});

//http://localhost:3000/updateProduct
app.put("/updateProduct", (request, response) => {
    let updateProduct = request.body;
    let index = products.findIndex(p => p.pid == updateProduct.pid);
    if(index < 0){
        response.json( {"status": false, "message": "Invalid Product ID."});
    }else{
        products[index] = updateProduct;
        fs.writeFileSync("product.json",JSON.stringify(products));
        response.json( {"status": true, "message": "Product updated successfully", "data": products});
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on ${process.env.PORT || 3000}`);
});