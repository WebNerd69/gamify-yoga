import dotenv from "dotenv"
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config()

// Load API key from environment variable instead of hardcoding
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const getRatingFromText = async({body})=>{
     try {
          const {name} = body
          if (!name) {
               return {success: false, message: "Name is required"}
          }

          const prompt = `give me a rating of 0 to 10 in difficulty scale for my yogasan named ${name} give me only number as rating for response dont add endline character and if you don't know about the yogasan reply 0 `;
          
          const result = await model.generateContent(prompt);
          const rating = result.response.text().trim();

          // Validate rating is a number between 0-10
          const numRating = Number(rating);
          if (isNaN(numRating) || numRating < 0 || numRating > 10) {
               return {success: false, message: "Invalid rating received from AI"}
          }

          console.log(`Rating for ${name}: ${rating}`);
          return {success: true, message: rating}
     } catch (error) {
          console.error("Error getting rating:", error);
          return {success: false, message: error.message}
     }
}

export {getRatingFromText}