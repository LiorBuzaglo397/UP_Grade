import Courses from "../model/Courses";

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
    const {course_ID , course_Name , course_Description} = req.body;
    const course = new Courses({
        course_ID , 
        course_Name , 
        course_Description
    });
    try{
        course.save();
    }catch(err){
        return console.log(err);
    }
    return res.status(200).json({course});

};