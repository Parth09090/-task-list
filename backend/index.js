const express = require("express");
const mongoose = require('mongoose'); 
const cors = require("cors")
const { todoSchema, updatetodoSchema } = require("./types");
const { todo } = require("./db");
const app = express();

app.use(express.json());
app.use(cors());
app.get("/todos",async(req,res)=>{
    const todos = await todo.find({});
    res.json({todos});
});

app.post("/todo",async(req,res)=>{
    //validation of the body using zod schemas
    const BodyPayload = req.body;
    const parsedBodyPayload = todoSchema.safeParse(BodyPayload);
    const title = req.body.title;
    const description = req.body.description;

    if(!parsedBodyPayload.success){
        res.status(411).json({
            msg :"Invalid inputs"
        });
        return;
    }

    await todo.create({
        title : title,
        description : description,
        status : false
    })

    res.json({
        msg : "todo Created Successfully"
    })

});

app.put("/updateTodo/:id",async(req,res)=>{
    const bodyPayload = req.params;
    const parsedPayload = updatetodoSchema.safeParse(bodyPayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg :"Invalid inputs"
        });
        return;
    }
    // Find and toggle the current status
    const updatedTodo = await todo.findByIdAndUpdate(
        bodyPayload.id,
        { $set: { status: !bodyPayload.status } }, // Toggle the status
    );

    if (!updatedTodo) {
        res.status(404).json({
            msg: "Todo not found",
        });
        return;
    }

    res.status(200).json({
        msg: "Todo updated successfully",
        updatedTodo,
    });

});

//delete functionality
app.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params; // Extract the id from params
        console.log("Received ID for deletion:", id);

        // Validate if the ID is a valid MongoDB ObjectId
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                msg: "Invalid ID format",
            });
        }

        // Find and delete the todo
        const deleteTodo = await todo.findByIdAndDelete(id);

        // If no document was found to delete
        if (!deleteTodo) {
            return res.status(404).json({
                msg: "Todo not found",
            });
        }

        // Send success response
        res.status(200).json({
            msg: "Todo deleted successfully",
            deletedTodo: deleteTodo,
        });
    } catch (err) {
        // Log the error and send internal server error response
        console.error("Error deleting todo:", err);
        res.status(500).json({
            msg: "Internal Server Error",
        });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));