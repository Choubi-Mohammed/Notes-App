const mongoose=require("mongoose")
const notesschema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        default: [],
    },
    isPinned: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: String,
        required: true,
    },
    createOn: {
        type: Date,
        default: Date.now,
    },
});
const Notes = mongoose.model("Notes", notesschema);
module.exports=Notes;