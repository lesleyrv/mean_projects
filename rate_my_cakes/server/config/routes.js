const cakes = require('../controllers/cakes.js')

module.exports = function(app){
    app.get("/cakes", function(request, response){
        cakes.index(request, response)
    })

    app.get("/cakes/:id", function(request, response){
        cakes.getOneCake(request, response)
    })
    
    app.post("/cakes", function(request, response){
        cakes.setNewCake(request,response)
    })

    app.put("/cakes/:id/reviews", function (request, response){
        cakes.setNewReview(request, response)
    })

}