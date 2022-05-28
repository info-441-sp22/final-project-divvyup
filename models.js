import mongoose from "mongoose"

let models = {}

dbConnect()

async function dbConnect() {
    console.log("trying to connect to mongodb database")
    await mongoose.connect("mongodb+srv://user0:password0@cluster0.dqu4m.mongodb.net/finalproject?retryWrites=true&w=majority")

    console.log("connected to the database!")

    // set up schemas and models
    const tripSchema = new mongoose.Schema({
        Users : [[String, String]],
        ShoppingList : [{type: mongoose.Schema.Types.ObjectId, ref: "List"}],
        PrimaryUserEmail : String
    })
    models.Trip = mongoose.model("Trip", tripSchema)

    const listSchema = new mongoose.Schema({
        tripID : String,
        NameOfItem : String,
        UserEmails : [{username: String, quantity:Number}],
        Quantity : Number,
        Price : Number,
    })
    models.List = mongoose.model("List", listSchema)

    console.log("created db models and schemas")
}


export default models;