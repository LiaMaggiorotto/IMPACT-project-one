const mongoose = require("mongoose");

const connectionString = "mongdb://localhost:27017/impact";

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})