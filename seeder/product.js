const fs = require('fs');
const { MongoClient } = require('mongodb');
const path = require('path');

// Đường dẫn đến file data.json của bạn
const filePath = path.join(__dirname, 'items.json');

// URL kết nối đến MongoDB (thay đổi nếu cần thiết)
const url = "mongodb://localhost:27017";

const dbName = 'lunasteel'; // Thay bằng tên cơ sở dữ liệu của bạn
const collectionName = 'products'; // Thay bằng tên bộ sưu tập của bạn

// Đọc file JSON
fs.readFile(filePath, 'utf8', (err, items) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  try {
    const jsonArray = JSON.parse(items);
    addToMongoDB(jsonArray);
  } catch (parseErr) {
    console.error('Error parsing JSON:', parseErr);
  }
});

// Thêm dữ liệu vào MongoDB
async function addToMongoDB(jsonArray) {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');


    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const currentDate = new Date();
    // Chuyển đổi kiểu dữ liệu và thêm createdAt, updatedAt cho mỗi object

    const convertedArray = jsonArray.map(item => ({
      "itemId": item._id,
      "grade": String(item.Grade),
      "standard": String(item.Standard),
      "baseSteelThickness": parseFloat(item["Base Steel Thickness"]),
      "postGalvanizationThickness": parseFloat(item["Post-Galvanization Thickness"]),
      "postPaintThickness": item["Post-Paint Thickness"] ? parseFloat(item["Post-Paint Thickness"]) : null,
      "pipeWallThickness": item["Pipe Wall Thickness"] ? parseFloat(item["Pipe Wall Thickness"]) : null,
      "width": parseFloat(item.Width),
      "diameter": item.Diameter ? parseFloat(item.Diameter) : null,
      "ZAZCoating": String(item["ZAZ Coating"]),
      "paintCoatingWeight": item["Paint Coating Weight"] ? parseFloat(item["Paint Coating Weight"]) : null,
      "color": String(item.Color),
      "primaryPaintColorCode": String(item["Primary Paint Color Code"]),
      "backPaintColorCode": String(item["Back Paint Color Code"]),
      "length": item.Length ? parseFloat(item.Length) : null,
      "shape": String(item.Shape),
      "surfaceCoatingLayer": String(item["Surface Coating Layer"]),
      "glossiness": item.Glossiness ? parseFloat(item.Glossiness) : null,
      "conversionRatio": parseFloat(item["Conversion Ratio"]),
      "lowerDimensionalTolerance": parseFloat(item["Lower Dimensional Tolerance"]),
      "upperDimensionalTolerance": parseFloat(item["Upper Dimensional Tolerance"]),
      "alloyCode": String(item["Alloy Code"]),
      "revision": Number(item.Revision),
      "revisionTrack": Number(item["Revision track"]),
      "stocked": Boolean(item.Stocked),
      "U/M": String(item["U/M"]),
      "type": String(item.Type),
      "source": String(item.Source),
      "productCode": String(item["Product Code"]),
      "ABCCode": String(item["ABC Code"]),
      "costType": String(item["Cost Type"]),
      "costMethod": String(item["Cost Method"]),
      "activeforDataIntegration": Boolean(item["Active for Data Integration"]),
      "acceptRequirement": Boolean(item["Accept requirement"]),
      "passrequirement": Boolean(item["Pass requirement"]),
      "lotTrack": Boolean(item["Lot Track"]),
      "reservable": Boolean(item.Reservable),
      "descriptions": String(item.Descriptions),
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