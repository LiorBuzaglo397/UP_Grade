import Courses from "../model/Courses.js";
import User from "../model/User.js";


export const getAllCourses = async(req , res , next) => {
    let courses;
    try{
        courses =await Courses.find();

    }catch(err){
        return console.log(err);
    }

    if(!courses){
        return res.status(404).json({message : "No Courses Found!"});
    }
    return res.status(200).json({courses});
};

export const addCourse = async( req , res , next) =>{
    const {course_ID , course_Name  , semester_Year ,semester_Num} = req.body;
    const course = new Courses({
        course_ID , 
        course_Name ,
        semester_Year ,
        semester_Num
    });
    try{
        course.save();
    }catch(err){
        return res.status(404).json({message : "Couldn't add course"});
    }
    return res.status(200).json({course});

};

export const addStudentToCourse = async (req, res, next) => {
  const { user_ID, course_ID, semester_Year, semester_Num } = req.body;

  try {
    const course = await Courses.findOne({
      course_ID: course_ID,
      semester_Year: semester_Year,
      semester_Num: semester_Num
    });
    console.log(user_ID);
    if (!course) {
      return res
        .status(404)
        .json({ message: "No course found for the specified year and semester." });
    }

    // Check if the teacher is already assigned to the course
    if (course.student_List.includes(user_ID)) {
      return res.status(400).json({ message: "Student is already assigned to the course." });
    }

    course.student_List.push(user_ID);
    await course.save();

    return res.status(200).json({ message: "Student added to the course successfully." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "An error occurred" });
  }
};
  export const addTeacherToCourse = async (req, res, next) => {
    const { user_ID, course_ID, semester_Year, semester_Num } = req.body;
  
    try {
      const course = await Courses.findOne({
        course_ID: course_ID,
        semester_Year: semester_Year,
        semester_Num: semester_Num
      });
  
      if (!course) {
        return res
          .status(404)
          .json({ message: "No course found for the specified year and semester." });
      }
  
      // Check if the teacher is already assigned to the course
      if (course.teacher_List.includes(user_ID)) {
        return res.status(400).json({ message: "Teacher is already assigned to the course." });
      }
  
      course.teacher_List.push(user_ID);
      await course.save();
  
      return res.status(200).json({ message: "Teacher added to the course successfully." });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "An error occurred" });
    }
  };

  export const getCoursebyObjectID = async (req, res, next) => {
    const { year, semester,course_ID ,user_ID } = req.body;
    
    try {
      const course = await Courses.findOne({ year: year, semester: semester , course_ID :course_ID });
      
      if (!course) {
        return res.status(404).json({ message: "No course found for the specified year and semester." });
      }
      
      course.teacher_List.push(user_ID);
      await course.save();
      
      return res.status(200).json({ message: "Teacher added to the course successfully." });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "An error occurred" });
    }
  };

  export const getUserByCourseInfo = async (req, res, next) => {
    const { _id } = req.query;
  
    try {
      const course = await Courses.findById(_id);
  
      if (!course) {
        return res.status(404).json({ message: "No course found for the specified ID." });
      }
  
      const students = course.student_List;
  
      // Retrieve the user information from the student list
      const userPromises = students.map(async (student) => {
        const user = await User.findById(student._id);
        return user;
      });
  
      const users = await Promise.all(userPromises);
  
      return res.status(200).json({ users });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "An error occurred" });
    }
  };
  

