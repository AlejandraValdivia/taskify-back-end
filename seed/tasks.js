const connectToDatabase = require('../connection')
const mongoose = require('mongoose');
const Task = require('../models/Task');

const seedTasks = async () => {
  try {
    await connectToDatabase();

    await Task.deleteMany({});

    const tasks = [
      {
        "_id": 1,
        "name": "Home Repairs",
        "description": "Do you need help with that leaking ceiling?",
        "booked": false
      },
      {
        "_id": 2,
        "name": "Yard Work",
        "description": "Does your health problems prevents you from doing yard work?",
        "booked": false
      },
      {
        "_id": 3,
        "name": "Painting",
        "description": "Are you afraid to ruin your walls by painting it yourself?",
        "booked": false
      },
      {
        "_id": 4,
        "name": "Cleaning",
        "description": "Too busy to clean your place?",
        "booked": false
      },
      {
        "_id": 5,
        "name": "Junk Removal",
        "description": "Can't stand that old couch and need it out of the house?",
        "booked": false
      },
      {
        "_id": 6,
        "name": "Furniture Assembly",
        "description": "Do you lack the patience to deal with furniture assembly?",
        "booked": false
      },
      {
        "_id": 7,
        "name": "Moving",
        "description": "Too exausting to move and do you need someone to help?",
        "booked": false
      },
      {
        "_id": 8,
        "name": "Electrical Work",
        "description": "Do you need to fix that broken light switch?",
        "booked": false
      },
      {
        "_id": 9,
        "name": "Plumbing Help",
        "description": "Do you need help with that leaking kitchen sink?",
        "booked": false
      },
      {
        "_id": 10,
        "name": "Locksmith Services",
        "description": "Can't find your key in the house?",
        "booked": false
      },
      {
        "_id": 11,
        "name": "Car Wash",
        "description": "Do you need help washing and detailing your car?",
        "booked": false
      },
      {
        "_id": 12,
        "name": "Organization",
        "description": "Is your closet overflowing with unused items and is time to organize it and declutter?",
        "booked": false
      },
      {
        "_id": 13,
        "name": "Errands",
        "description": "Are you tired of doing errands and need someone to help?",
        "booked": false
      },
      {
        "_id": 14,
        "name": "General Mounting",
        "description": "Let the professionals help you mounting that TV?",
        "booked": false
      },
      {
        "_id": 15,
        "name": "Car Repair",
        "description": "Do you need help with your car engine?",
        "booked": false
      },
      {
        "_id": 16,
        "name": "Packing & Unpacking",
        "description": "Do you need an extra hand packing and unpacking?",
        "booked": false
      }
    ];


    await Task.create(tasks);
    console.log("Tasks created!");

    const allTasks = await Task.find();
    console.log("All tasks:", allTasks);

    mongoose.connection.close(); 
  } catch (err) {
    console.error("Error seeding data:", err);
  }
};

seedTasks();
