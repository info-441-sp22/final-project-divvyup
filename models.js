import mongoose from "mongoose"

let models = {}

dbConnect()

async function dbConnect() {
    console.log("trying to connect to mongodb database")
    await mongoose.connect("mongodb+srv://user0:password0@cluster0.dqu4m.mongodb.net/finalproject?retryWrites=true&w=majority")

    console.log("connected to the database!")

    // set up schemas and models
    const tripSchema = new mongoose.Schema({
        Users : [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
        //ShoppingList : [{type: mongoose.Schema.Types.ObjectId, ref: "List"}],
        PrimaryUserEmail : String
    })
    models.Trip = mongoose.model("Trip", tripSchema)

    const userSchema = new mongoose.Schema({
        Name : String,
        Email : String
    })
    models.User = mongoose.model("User", userSchema)

    const listSchema = new mongoose.Schema({
        NameOfItem : String,
        UserEmails : [String],
        Quantity : Number,
        Price : Number,
        Bought : Boolean
    })
    models.List = mongoose.model("List", listSchema)

    console.log("created db models and schemas")
}


export default models;