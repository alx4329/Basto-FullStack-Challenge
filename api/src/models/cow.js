const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cowSchema = new Schema({
    id_senasa: {
        type: String,
        required: true,
        unique: true
    },
    type:{
        type: String,
        enum:['Steer','Bull','Heifer'],
        required: true
    },
    weight:{
        type: Number,
        required: true
    },
    paddockName:{
        type: String,
        required: true
    },
    deviceType:{
        type: String,
        enum:['Necklace','Caravan'],
        required: true
    },
    deviceNumber:{
        type: String,
        required: true
    }
})

module.exports  = mongoose.model('Cow', cowSchema);