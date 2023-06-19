import Grade from "../model/Grade";

export const getAllGrades=  async( req , res , next) =>{

    let grade ;
    try{

        grade = await Grade.find();
    }catch(err){
        return console.log(err);
    }
    if(!grade){
        return res.status(404).json({message : "No grades found"});

    }
    return res.status(200).json({grade});

};


export const addGrade =  async( req , res , next) =>{
    const {studentId , courseId , semester , gradeType , grade} = req.body;
    const graded = new Grade({
        studentId , 
        courseId ,
        semester , 
        gradeType , 
        grade
    });
    try{
        graded.save();
    }catch(err){
        return console.log(err);
    }
    return res.status(200).json({graded});

};

export const getGradesByStudentID=  async( req , res , next) =>{
    const studentId = req.Grade.studentId;

    let grade ;
    try{

        grade = await Grade.find({studentId :studentId });
    }catch(err){
        return console.log(err);
    }
    if(!grade){
        return res.status(404).json({message : "No grades found"});

    }
    return res.status(200).json({grade});

};

export const getGradesByCourseID=  async( req , res , next) =>{
    const courseId = req.Grade.courseId;

    let grade ;
    try{

        grade = await Grade.find({courseId :courseId });
    }catch(err){
        return console.log(err);
    }
    if(!grade){
        return res.status(404).json({message : "No grades found"});

    }
    return res.status(200).json({grade});

}
