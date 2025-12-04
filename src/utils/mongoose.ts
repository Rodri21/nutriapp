import mongoose, { connection } from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable inside .env");
}

const conn = {
    isConnected: false
}

/**
 * Establish a connection to the MongoDB database using Mongoose.
 */
export async function connectDB() {
    console.log('🔌 Attempting to connect to MongoDB...');
    
    if (!MONGO_URI) {
        console.error('❌ ERROR: The environment variable MONGO_URI is not defined.');
        process.exit(1); 
    }
    
    try {
        if (conn.isConnected) return;
        const db = await mongoose.connect(MONGO_URI);
        console.log(`🌐 Connected to database: ${db.connection.db?.databaseName}`);
        conn.isConnected = db.connections[0].readyState === 1;
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error);
        process.exit(1); 
    }
};

connection.on('connected', () => {
    console.log('Mongoose connected to DB');
});

connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});