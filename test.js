const { MongoClient } = require("mongodb");

// MongoDB 連接 URI
const uri = "mongodb://127.0.0.1:27017"; // 本地 MongoDB 默認地址
const client = new MongoClient(uri);

async function run() {
  try {
    // 連接到 MongoDB
    await client.connect();
    console.log("✅ 成功連接到 MongoDB");

    // 選擇數據庫
    const db = client.db("ecommerce");

    // 創建或選擇集合
    const products = db.collection("products");

    // 插入測試數據
    const result = await products.insertOne({ name: "Test Product", price: 100 });
    console.log("✅ 插入數據成功，ID:", result.insertedId);

    // 查詢數據
    const allProducts = await products.find().toArray();
    console.log("✅ 查詢數據成功:", allProducts);
  } catch (err) {
    console.error("❌ 發生錯誤:", err);
  } finally {
    // 關閉連接
    await client.close();
  }
}

run();