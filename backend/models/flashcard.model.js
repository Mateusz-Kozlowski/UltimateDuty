import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema({
	category: { type: String, required: true }, // e.g., "cognitive_biases"
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional, if user-generated
	question: { type: String, required: true },
	answer: { type: String, required: true }
});

const Flashcard = mongoose.model("Flashcard", flashcardSchema);

export default Flashcard;
