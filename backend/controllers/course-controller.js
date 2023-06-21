import Courses from "../model/Courses.js";

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

export const addStudentToCourse = async( req , res , next) =>{
    const { year, semester, course_ID ,studentId } = req.body;
  
    try {
      const course = await Courses.findOne({ year: year, semester: semester , course_ID: course_ID });
      
      if (!course) {
        return res.status(404).json({ message: "No course found for the specified year and semester." });
      }
      
      course.student_List.push(studentId);
      await course.save();
      
      return res.status(200).json({ message: "Student added to the course successfully." });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "An error occurred" });
    }
  };
  export const addTeacherToCourse = async (req, res, next) => {
    const { year, semester,course_ID ,teacherId } = req.body;
    
    try {
      const course = await Courses.findOne({ year: year, semester: semester , course_ID :course_ID });
      
      if (!course) {
        return res.status(404).json({ message: "No course found for the specified year and semester." });
      }
      
      course.teacher_list.push(teacherId);
      await course.save();
      
      return res.status(200).json({ message: "Student added to the course successfully." });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "An error occurred" });
    }
  };

