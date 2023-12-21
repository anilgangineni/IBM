const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

function openDatabase() {
  const dbName = "petrolDelivery";
  const request = indexedDB.open(dbName, 1);

  request.onupgradeneeded = function(event) {
    const db = event.target.result;
    const store = db.createObjectStore("petrolOrders", { keyPath: "orderId" });
  };

  request.onsuccess = function(event) {
    db = event.target.result;
  };

  request.onerror = function(event) {
    console.error("Error opening database:", event.target.error);
  };
}

function placeOrder() {
  openDatabase();

  const fuelType = document.getElementById("fuelType").value;
  const quantity = parseFloat(document.getElementById("quantity").value);
  const address = document.getElementById("address").value;

  if (!fuelType || !quantity || !address) {
    document.getElementById("orderStatus").innerText = "Please fill in all required fields.";
    return;
  }

  const order = {
    fuelType,
    quantity,
    address,
    orderId: Date.now()
  };

  const transaction = db.transaction(["petrolOrders"], "readwrite");
  const store = transaction.objectStore("petrolOrders");

  console.log("Fuel type:", fuelType);
  console.log("Quantity:", quantity);
  console.log("Address:", address);
  console.log("Order ID:", order.orderId);

  store.add(order)
    .onsuccess = function() {
      document.getElementById("orderStatus").innerText = "Order placed successfully!";
    }
    .onerror = function(event) {
      console.error("Error adding order:", event.target.error);
      document.getElementById("orderStatus").innerText = `Order placed successfully! ${order.orderId}`;
    };

  transaction.oncomplete = function() {
    db.close();
  };
}
function trackOrder(){
  alert("Your Order Is Currently Under Progress Wait For A While");
}