import mongoose from "mongoose";

// Define a flexible schema that matches your existing data
 const soboResult = mongoose.model('Result', 
  new mongoose.Schema({}, { strict: false }), 
  'Results'
);

export default soboResult;