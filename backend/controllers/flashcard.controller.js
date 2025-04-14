import Flashcard from "../models/flashcard.model.js";
import biases from "../flashcards/biasesData.js";

export const getCategoryFlashcards = async (req, res) => {
    try {
        /*const { category } = req.query;
	    const filter = { };

	    if (category) {
            filter.category = category;
        }

	    // Only show public flashcards + user's own
	    filter.$or = [{ user: null }, { user: req.user._id }];

	    const flashcards = await Flashcard.find(filter);*/

        console.log('get category flashcards')
	    res.status(200).json(biases);
    }
    catch (error) {
        console.error("Error in getPublicPosts controller:", error);
        res.status(500).json({ message: "Server error" });
    }
}
