const mongoose = require('mongoose');
// const mongooseDateFormat = require('mongoose-date-format');

const exploreSchema = new mongoose.Schema({
    hirename:{type: String, require:true},
    hireemail:{ type: String, require: true},
    hirecompany:{type: String, require:true},
    hireposition:{ type: String, require: true},
    hireeli:{ type: Number, require: true},
    hirestipend:{type: Number, require:true},
    hiredate: {type: Date, default: Date.now(), require:true},
    hirecontact: {type:Number, require:true},
    hirecompanyemail: {type: String, require: true},
    hiredesc: {type: String, require: true},
    img:{data:String,type:String},
    hirelink: { type: String, require: true},

},
{ collection : 'explore'}
)
// exploreSchema.plugin(mongooseDateFormat);  // format: YYYY-MM-DD HH:mm:ss
const model = mongoose.model('exploreSchema', exploreSchema);

module.exports = model;