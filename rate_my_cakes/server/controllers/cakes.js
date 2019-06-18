require('../models/cake.js')
const mongoose = require("mongoose");
const Cake = mongoose.model('Cake');
const Review = mongoose.model('Review');

module.exports = {

    index : function (request, response) {
        Cake.find({}, function (error, data) {
            if (error) {
                console.log(error);
                response.json({ message:"Error", error: error});
            }
            else {
                console.log(data);
                response.json({message:"Success", data: data});
            };
        });
    },

    getOneCake: function (request, response) {
        Cake.findOne({
            _id : request.params.id
        }, function (error, data){
                if (error){
                    console.log(error);
                    response.json({message:"Error", error: error});
                }else { 
                    console.log(data);
                    response.json({message:"Success", data: data});
                };
            });
    },
    
    setNewCake: function (request, response){
        console.log("POST DATA :" + request.body);
        var cake = new Cake({
            bakerName : request.body.bakerName,
            cakeImage : request.body.cakeImage
        });
        cake.save(function(error,data) {
            if (error){
                console.log(error);
                response.json({message : " Error", error : error});
            } else {
                console.log ("Successfully save your data!");
                response.json({message:"Success", data: data});
            };
        });
    },

    // addComment: function (request, response){
    //     console.log(request.params.id);
    //     console.log(request.body)
    //     Cake.update({
    //         star : request.body.rating,
    //         comment : request.body.comment},
    //         {new: true},
    //         function(error, data){
    //             if (error){
    //                 console.log(error);
    //                 response.json({ message : "Error", error : error});
    //             } else {
    //                 console.log("Successfully added comment");
    //                 response.json({message: "Success", data : data});
    //             };
    //     });
    // },


    setNewReview: function (request, response){
        console.log("POST DATA :" + request.body);
        var review = new Review({
            rating : request.body.rating,
            comment : request.body.comment
        });
        review.save(function(err) {
            if(err) {
                response.json({error:err})
                console.log(" on save")
            }else {
                // console.log(" to update the cake review")
                // Cake.findOne({_id:request.params.id}, function(err, cake){
                //     cake.reviews.push({rating : request.body.rating, comment : request.body.comment});
                //     cake.save(function(err){
                //         response.json({message:"Successfully added new review to cake", data:cake})
                //     })
                //    })

                Cake.findOneAndUpdate({_id:request.params.id}, {$push: {reviews: review}}, function(err,cake) {
                    if(err) {
                        response.json({error: err})
                        console.log("bad coommment - not save")
                    }else {
                        response.json({message:"Successfully added new review to cake", data:cake})
                    }
                });
            }
        })
    },

}
