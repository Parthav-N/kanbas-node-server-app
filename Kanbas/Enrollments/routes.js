import * as dao from "./dao.js";
export default function EnrollmentRoutes(app) {
  app.post("/api/courses/:userId/:courseId/enroll", (req, res) => {
    const { courseId } = req.params;
    const { userId } = req.params;
    dao.enrollUserInCourse(userId, courseId);
    res.sendStatus(200);
  });
  app.delete("/api/courses/:userId/:courseId/unenroll", (req, res) => {
    const { courseId } = req.params;
    const { userId } = req.params;
    dao.unenrollUserFromCourse(userId, courseId);
    res.sendStatus(200);
  });

  app.get("/api/enrollments/:courseId", async (req, res) => {
    const { courseId } = req.params;
  
    try {
      // Call the function and await the result
      const users = await dao.findUsersForCourse(courseId);
  
      // Respond with the array of users
      res.json(users);
    } catch (error) {
      console.error("Error in GET /api/enrollments/:courseId:", error);
      res.status(500).json({ error: "Failed to fetch users for course" });
    }
  });
  
}