import Assignment from "../model/Assignment";
import Courses from "../model/Courses";

export const addAssignment = async (req, res, next) => {
  const { course_ID, assignment_Name, upload_Date, type } = req.body;

  try {
    const assignment = new Assignment({
      course_ID,
      assignment_Name,
      upload_Date,
      type,
    });

    await assignment.save();

    return res.status(200).json({ assignment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

  export const getAllAssignment = async(req ,res , next ) =>{
    let assignment;
    try{
      assignment = await Assignment.find();
    }catch(err){
        console.log(err);

    }
    if(!assignment){
        return res.status(404).json({message : "No users found"});
    }
    return res.status(200).json({assignment});
}


export const getAllAssignmentByCourseID = async (req, res, next) => {
  const { course_ID } = req.query;

  try {
    // Find all assignments with the given course_ID
    const assignments = await Assignment.find({ course_ID });

    console.log(assignments);

    return res.status(200).json({ assignments });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "An error occurred" });
  }
};


export const addOrUpdateAssignment = async (req, res, next) => {
  const { course_ID, assignments } = req.body;

  try {
    let course = await Courses.findById(course_ID);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Initialize assignment_List if it doesn't exist
    if (!Array.isArray(course.assignment_List)) {
      course.assignment_List = [];
    }

    // Iterate over the received assignments
    for (const assignment of assignments) {
      const { _id, assignment_Name, upload_Date, type } = assignment;

      if (_id) {
        // Update existing assignment
        const existingAssignment = await Assignment.findById(_id);

        if (existingAssignment) {
          existingAssignment.assignment_Name = assignment_Name;
          existingAssignment.upload_Date = upload_Date;
          existingAssignment.type = type;

          await existingAssignment.save();
        } else {
          return res.status(404).json({ message: "Assignment not found" });
        }
      } else {
        // Add new assignment
        const newAssignment = new Assignment({
          course_ID,
          assignment_Name,
          upload_Date,
          type,
        });

        await newAssignment.save();
        course.assignment_List.push(newAssignment._id);
      }
    }

    await course.save();

    return res.status(200).json({ message: "Assignments updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};



