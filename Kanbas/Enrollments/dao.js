import model from "./model.js";

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
  try {
    // Fetch enrollments and populate the `user` field
    const enrollments = await model.find({ course: courseId }).populate("user");

    // Ensure enrollments is an array
    if (!Array.isArray(enrollments)) {
      console.error("Expected enrollments to be an array, got:", enrollments);
      return []; // Return an empty array if it's not
    }

    // Map and return the `user` objects
    return enrollments.map((enrollment) => enrollment.user);
  } catch (error) {
    console.error("Error in findUsersForCourse:", error);
    throw error; // Propagate the error for higher-level handling
  }
}


export function enrollUserInCourse(user, course) {
  return model.create({ user, course });
}

export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}
 

// export function createModule(module) {
//   const newModule = { ...module, _id: Date.now().toString() };
//   Database.modules = [...Database.modules, newModule];
//   return newModule;
// }

// export function deleteModule(moduleId) {
//   const { modules } = Database;
//   Database.modules = modules.filter((module) => module._id !== moduleId);
//  }