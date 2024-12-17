const z = require("zod");

const todoSchema = z.object({
    title : z.string(),
    description : z.string(),
    status : z.boolean()
})

const updatetodoSchema = z.object({
    id : z.string()
})

module.exports = {
    todoSchema : todoSchema,
    updatetodoSchema : updatetodoSchema
}