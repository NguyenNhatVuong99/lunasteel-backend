const fs = require('fs');
const { MongoClient } = require('mongodb');
const path = require('path');
const { Double } = require('mongodb'); // Import lớp Double từ MongoDB

// Đường dẫn đến file data.json của bạn
const filePath = path.join(__dirname, 'data.json');

// URL kết nối đến MongoDB (thay đổi nếu cần thiết)
const mongoURI = 'mongodb+srv://nhatvuong:nhatvuong99@cluster0.oaomex9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const dbName = 'lunasteel'; 
const collectionName = 'prices';
// Đọc file JSON
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  try {
    let jsonArray = JSON.parse(data);

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
  const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const currentDate = new Date();

    // Chuyển đổi kiểu dữ liệu và thêm createdAt, updatedAt cho mỗi object
    const convertedArray = jsonArray.map(item => ({
      "itemId": Number(item.itemId), // Chuyển đổi itemId sang số
      "unitPrice": Number(item.unitPrice), // Chuyển đổi unitPrice sang số
      "supportedDensity": new Double(parseFloat(item.supportedDensity)), // Chuyển đổi supportedDensity sang Double
      "createdAt": currentDate,
      "updatedAt": currentDate
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
