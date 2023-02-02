const express = require("express");
const app = express();
const mongoose = require("mongoose");

const port = 9999;

// cnx BD

mongoose
  .connect("mongodb://localhost:27017/schMongoose", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db is connected"))
  .catch((err) => console.log(err));
// creation du model 
// 1 defenir shcema 
const { Schema } = mongoose;

const personSchema = new Schema({
  name:  {type:String,required:true}, // String is shorthand for {type: String}
  age: Number,
  favoriteFoods: [String],
});

// 2 definition of model

const personModel = mongoose.model('person', personSchema);
app.listen(port, (err) =>
  err ? console.log(err) : console.log(`server is running on port ${port}`)
);
// Create and Save a Record of a Model:

const P1 = new personModel ({name:'sami',age:28,favoriteFoods:['crepe']})
//console.log(P1)

// P1.save(function(err, data) {

//     err?console.log(err):console.log(data)
  
//   });

// Create Many Records with model.create()
const manyPerson = [{ name: 'John_Smith', age: 66, favoriteFoods: ['spaguetti','burritos'] },{ name: 'John_John', age: 66, favoriteFoods: ['burritos'] },
{ name: 'Bill_James', age: 33, favoriteFoods: ['salade','burritos'] }]
// personModel.create(manyPerson);


//Use model.find() to Search Your Database

//  personModel.findOne({ favoriteFoods: ['crepe'] },(err,data)=>err? console.log(err):console.log(data))
// const first = async() => { 
//     const findP = await personModel.findOne({ favoriteFoods: ['crepe'] })
//     console.log(findP)
//  }
// first()
 personModel.findOne({ favoriteFoods: ['crepe'] }).then((data)=>console.log(data)).catch(err=>console.log(err))


 // Use model.findById() to Search Your Database By _id

 personModel.findById("63db80363665a69dd1345170", function (err, data) {err?console.log(err):console.log(data)});


 //Perform Classic Updates by Running Find, Edit, then Save

//  personModel.findById("63db80363665a69dd1345170").updateOne({name : "seif"},function (err, data) {err?console.log(err):console.log(data)});
personModel.findById("63db80363665a69dd1345170",(err,data)=>{
if (err) {
    console.log(err)
} else {
    // data.favoriteFoods.push("hamburger")
//    data.save(function(err, data) {

//     err?console.log(err):console.log(data)
  
//   });
}

});



// Perform New Updates on a Document Using model.findOneAndUpdate()


// personModel.findOneAndUpdate({name : "seif"}, { age: 50 },{new:true},(err,data)=>{err?console.log(err):console.log(data)})


//  Delete One Document Using model.findByIdAndRemove


personModel.findByIdAndRemove("63db8680b62d1f4ec0d7546f", (err,data)=>err?console.log(err):console.log(data)) // executes


//MongoDB and Mongoose - Delete Many Documents with model.remove()



// personModel.remove({age:{$gte:30}}, function (err, result) {
//     if (err){
//         console.log(err)
//     }else{
//         console.log("Result :", result) 
//     }
// })


// Chain Search Query Helpers to Narrow Search Results

personModel.find({ favoriteFoods: 'burritos' }).sort({ name: 'ascending' }).limit(2).select('-age').exec((err,data)=>err?console.log(err) :console.log(data))



