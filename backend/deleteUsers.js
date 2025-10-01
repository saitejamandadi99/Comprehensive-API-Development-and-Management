const mongoose = require('mongoose');
const User = require('./models/userModel'); 
require('dotenv').config();

async function deleteAllUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const result = await User.deleteMany({});
    console.log(`Deleted ${result.deletedCount} users from the collection.`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error deleting users:', error);
  }
}

deleteAllUsers();
