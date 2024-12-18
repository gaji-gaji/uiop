const mongoose = require('mongoose');

// MongoDB 연결 함수
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // 연결 실패 시 프로세스 종료
    }
};

module.exports = connectDB;
