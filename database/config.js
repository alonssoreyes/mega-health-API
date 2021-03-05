const mongoose = require('mongoose');

const dbConnect = async () => { 

    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:false
        });
        
    } catch (error) {
        throw new Error(error);
    }

}


module.exports = {
    dbConnect
}