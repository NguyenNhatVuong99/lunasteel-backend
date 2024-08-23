const fs = require('fs');
const { MongoClient } = require('mongodb');
const path = require('path');

// Đường dẫn đến file data.json của bạn
const filePath = path.join(__dirname, 'warehouse.json');

// URL kết nối đến MongoDB (thay đổi nếu cần thiết)
const url = "mongodb://localhost:27017";

const dbName = 'lunasteel'; 
const collectionName = 'warehouses'; // Thay bằng tên bộ sưu tập của bạn
// Đọc file JSON
fs.readFile(filePath, 'utf8', (err, warehouse) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  try {
    let jsonArray = JSON.parse(warehouse);

    // Kiểm tra nếu jsonArray không phải là mảng, có thể nó là một đối tượng chứa mảng
    if (!Array.isArray(jsonArray)) {
      if (jsonArray.data && Array.isArray(jsonArray.data)) {
        jsonArray = jsonArray.data;
      } else {
        console.error('Parsed data does not contain an array');
        return;
      }
    }

    addToMongoDB(jsonArray);
  } catch (parseErr) {
    console.error('Error parsing JSON:', parseErr);
  }
});

// Thêm dữ liệu vào MongoDB
async function addToMongoDB(jsonArray) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const currentDate = new Date();

    // Chuyển đổi kiểu dữ liệu và thêm createdAt, updatedAt cho mỗi object
    const convertedArray = jsonArray.map(item => ({
      coilID: Number(item["Coil ID"]), // Chuyển đổi Coil ID sang số
      receiptDate: Number(item["receiptDate"]), // Chuyển đổi receiptDate sang số
      itemId: Number(item["itemId"]), // Chuyển đổi itemId sang số
      supplierCoilID: Number(item["Supplier Coil ID"]), // Chuyển đổi Supplier Coil ID sang số
      plating: String(item["Plating"]),
      netWeightKg: parseFloat(item["Net Weight (kg)"]),
      grossWeightKg: parseFloat(item["Gross Weight (kg)"]),
      amount: Number(item.Amount),
      actualDensity: parseFloat(item["Actual Density"]),
      prime: String(item.Prime),
      lengthA: parseFloat(item["Length A"]),
      lengthC: parseFloat(item["Length C"]),
      fixedDensity: parseFloat(item["Fixed Density"]),
      storageLocation: String(item["Storage Location"]),
      note: String(item.Note),
      thicknessByWidth: String(item["Thickness by Width"]),
      ageOfInventory: String(item["Age of Inventory"]),
      reportCLC: String(item["Report CLC"]),
      supplierName: String(item["Supplier Name"]),
      inputInterpretation: String(item["Input Interpretation"]),
      order: String(item.Order),
      orderID: String(item["Order ID"]),
      customer: String(item.Customer),
      warehouseCode: String(item["Warehouse Code"]),
      orderStatus: Number(item["Order Status"]),
      standardPacking: String(item["Standard Packing"]),
      status: String(item.Status),
      createdAt: currentDate,
      updatedAt: currentDate
    }));

    // Thêm vào MongoDB
    const result = await collection.insertMany(convertedArray);
    console.log(`Inserted ${result.insertedCount} documents`);
  } catch (error) {
    console.error('Error inserting documents:', error);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}
