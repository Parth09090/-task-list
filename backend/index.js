const express = require("express");
const { todoSchema, updatetodoSchema } = require("./types");
const { todo } = require("./db");
const app = express();

app.use(express.json());

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

app.put("/updateTodo",async(req,res)=>{
    const bodyPayload = req.body;
    const parsedPayload = updatetodoSchema.safeParse(bodyPayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg :"Invalid inputs"
        });
        return;
    }
    // Find and toggle the current status
    const updatedTodo = await todo.findByIdAndUpdate(
        bodyPayload._id,
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
app.delete("/delete" ,async(req,res)=>{
    const bodyPayload = req.body;
    const parsedPayload = updatetodoSchema.safeParse(bodyPayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg :"Invalid inputs"
        });
        return;
    }
    // // Convert string id to ObjectId using `new`
    // const objectId = new mongoose.Types.ObjectId(bodyPayload.id);

    const deleteTodo = await todo.findByIdAndDelete(bodyPayload._id);
    if (!deleteTodo) {
        res.status(404).json({
            msg: "Todo not found",
        });
        return;
    }

    res.status(200).json({
        msg: "Todo deleted successfully",
        deletedTodo: deleteTodo,
    });
})

app.listen(3000, () => console.log("Server running on port 3000"));