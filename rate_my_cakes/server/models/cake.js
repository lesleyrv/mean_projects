const mongoose = require("mongoose");

var reviewSchema = new mongoose.Schema({
    rating : { type: Number, min : 1, max : 5, required: true},
    comment : {type: String, default: ""}
    }, 
    { timestamps: true });


var cakeSchema = new mongoose.Schema({
    bakerName: { type: String, required: true },
    cakeImage: { type: String, default: "" },
    reviews: [reviewSchema]
    }, 
    { timestamps: true });

mongoose.model("Cake", cakeSchema);
mongoose.model("Review", reviewSchema);
