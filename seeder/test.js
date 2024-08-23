

const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://nhatvuong:nhatvuong99@cluster0.oaomex9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.set('strictQuery', true);

async function testConnection() {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connection successful');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    } finally {
        mongoose.disconnect(); // Close the connection after the test
    }
}

testConnection();