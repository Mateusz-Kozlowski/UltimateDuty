import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
	{
		author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		content: { type: String },
		image: { type: String },
		likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		comments: [
			{
				content: { type: String },
				user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
				createdAt: { type: Date, default: Date.now },
			},
		],
		sentiment: {
			star_rating: {
				label: { type: String },  // e.g., "1 star", "2 stars", etc.
				score: { type: Number },  // Confidence score for the star rating
			},
			emotion: [
				{
					label: { type: String },  // e.g., "joy", "disgust", etc.
					score: { type: Number },  // Confidence score for each emotion
				},
			],
		},
	},
	{ timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
