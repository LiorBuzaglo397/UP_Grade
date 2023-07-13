import User from "../model/User.js";
import Grade from "../model/Grade.js"





export const getAllGrades = async (req, res, next) => {
  let grades;
  try {
    grades = await Grade.find();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
  if (grades.length === 0) {
    return res.status(404).json({ message: "No grades found" });
  }
  return res.status(200).json({ grades });
};

export const addGrade = async (req, res, next) => {
  const {
    user_ID,
    course_ID,
    semester_Year,
    semester_Num,
    gradeType,
    gradeTypeNum,
    grade,
    gradeUploadDate,
  } = req.body;


  const graded = new Grade({
    user_ID,
    course_ID,
    semester_Year,
    semester_Num,
    gradeType,
    gradeTypeNum,
    grade,
    gradeUploadDate,
  });

  try {
    await graded.save();
    return res.status(200).json({ graded });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getGradesByStudentID = async (req, res, next) => {
  const user_ID = req.params.user_Id;
  try {
    const userExists = await User.exists({ user_ID });
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }
    const grades = await Grade.find({ user_ID: mongoose.Types.ObjectId(user_Id) });
    if (grades.length === 0) {
      return res.status(404).json({ message: "No grades found" });
    }
    console.log(grades);
    return res.status(200).json({ grades });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getGradesByCourseIDForTeacher = async (req, res, next) => {
  const { course_ID, semester_Year, semester_Num } = req.query;
  
  try {
    const grades = await Grade.find({
      course_ID,
      semester_Year,
      semester_Num
    });
    console.log(grades);
    if (grades.length === 0) {
      return res.status(404).json({ message: "No grades found" });
    }
    console.log(grades);
    return res.status(200).json({ grades });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getGradesByCourseIDForStudent = async (req, res, next) => {
  const { user_ID, course_ID, semester_Year, semester_Num } = req.query;

  try {
    const userExists = await User.find({ user_ID: user_ID });
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user_ID);

    const grades = await Grade.find({
      user_ID,
      course_ID,
      semester_Year,
      semester_Num
    });
    console.log(grades);

    if (grades.length === 0) {
      return res.status(404).json({ message: "No grades found" });
    }

    //const prageMap = new Map();
    //for (const grade in grades) {
     // prageMap.set(user_Id, grades[grade]);
   // }

    return res.status(200).json({ grades });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


  
