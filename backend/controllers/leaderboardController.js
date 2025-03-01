import userModel from '../models/userModel.js';
import postsModel from '../models/postsModel.js';

const getLeaderboard = async (req, res) => {
     try {
          // Get all users sorted by average rating in descending order
          const leaderboard = await userModel.find({})
               .select('name avgRating _id')
               .sort({ avgRating: -1 })
               .limit(10);

          if (!leaderboard.length) {
               return res.json({ success: false, message: "No users found" });
          }

          // Get number of posts for each user
          for (let user of leaderboard) {
               const posts = await postsModel.find({ userId: user._id });
               user.yogaDone = posts.length;
          }

          res.json({ 
               success: true, 
               leaderboard: leaderboard.map((user, index) => ({
                    rank: index + 1,
                    userId: user._id,
                    name: user.name,
                    avgRating: user.avgRating,
                    yogaDone: user.yogaDone
               }))
          });

     } catch (error) {
          console.log(error.message);
          res.json({ success: false, message: error.message });
     }
}

export { getLeaderboard };
