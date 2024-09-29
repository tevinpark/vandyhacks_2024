import mongoose from 'mongoose';

const connectToDatabase = async () => {
    if (mongoose.connection.readyState === 1) {
        console.log(`Connected to database: ${mongoose.connection.db.databaseName}`);
        return;
    }

    const uri = process.env.MONGODB_URI;

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log(`Connected to database: ${mongoose.connection.name}`);
};

export default connectToDatabase;
