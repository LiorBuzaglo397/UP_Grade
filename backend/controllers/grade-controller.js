import User from "../model/User.js";
import Grade from "../model/Grade.js"
import xlsx from 'xlsx';





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


export const addGradeWithFile = async (req, res, next) => {
  const file = req.files && req.files.file;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const workbook = xlsx.read(file.data, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Assuming the Excel sheet has the same field names as the grade model
    const grades = sheetData.map((row) => ({
      user_ID: row.user_ID,
      course_ID: row.course_ID,
      semester_Year: row.semester_Year,
      semester_Num: row.semester_Num,
      gradeType: row.gradeType,
      gradeTypeNum: row.gradeTypeNum,
      grade: row.grade,
      gradeUploadDate: row.gradeUploadDate,
    }));

    await Grade.insertMany(grades);

    return res.status(200).json({ message: 'Grades added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
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
    const grades = await Grade.find({ user_ID: mongoose.Types.ObjectId(user_ID) });
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


  
