const mongoose = require('mongoose');

const dbConnect = async () => { 

    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:false
        });

        console.log('db online');
    } catch (error) {
        throw new Error(error);
    }

}


module.exports = {
    dbConnect
}