const { User } = require('./User');
const Task = require('./Task');
const Review = require('./Review');
const Category = require('./Category');


const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);

module.exports = { 
    User,
    Task,
    Review,
    Category

}
