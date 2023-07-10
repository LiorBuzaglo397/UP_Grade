import User from "../model/User.js";
import brcypt from 'bcryptjs' ;
import Courses from "../model/Courses.js";

export const getAllUser = async(req ,res , next ) =>{
    let users;
    try{
        users = await User.find();
    }catch(err){
        console.log(err);

    }
    if(!users){
        return res.status(404).json({message : "No users found"});
    }
    return res.status(200).json({users});
}

export const signup = async(req ,res , next) =>{
    const {user_ID , user_Password , first_Name , last_Name ,email , user_Description , user_Approved , courses} = req.body;
    

    let existingUser;
    try{
        existingUser = await  User.findOne({email});
    }catch(err){
        return console.log(err);
    }
    if(existingUser){ //if the user is already singUp to the website
        return res
            .status(400)
            .json({message : "User Already Exists! Login Instead"})
    }
    const hashedPassword = brcypt.hashSync(user_Password);

    const user = new User ({
        user_ID ,
        first_Name ,
        last_Name ,
        email ,
        user_Description ,
        user_Approved ,
        user_Password : hashedPassword,
        courses
    });


    try{
        await user.save();

    }catch(err){
       return console.log(err);
    }
    return res.status(201).json({user});
};

export const login = async(req , res , next) => {
    const {email,  user_Password  } = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email : email});
    }catch(err){
        return console.log(err);
    }
    if(!existingUser){ //if the user is already singUp to the website
        return res
            .status(400)
            .json({message : "Couldn't Find User By This Email"});
    }
    console.log('user_Password:', user_Password);
    console.log('existingUser.user_Password:', existingUser.user_Password);

    
    const isPasswordCorrect = await brcypt.compareSync( user_Password , existingUser.user_Password);
    console.log(isPasswordCorrect);
    if(!isPasswordCorrect){
       return res.status(400).json({message : "Incorrect Password"});
    }
    return res.status(200).json({ message: "Success" , user: existingUser});

};

export const getAllCourses = async (req, res, next) => {
  const { user_ID } = req;

  try {
    // Find the user by their ID
    const user = await User.findOne(user_ID);

    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Retrieve the user's courses
    const courses = user.courses;

    if (courses.length === 0) {
      return res.status(404).json({ message: "No courses found for the user" });
    }

    const courselist = await Courses.find({ _id: { $in: courses } });


    return res.status(200).json({ courses: courselist });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "An error occurred" });
  }
};

export const addCourseToStudent = async (req, res, next) => {
  const { studentId, _id } = req.body;

  try {
    const user = await User.findOne({ studentId: studentId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!Array.isArray(user.courses)) {
      user.courses = []; // Initialize the courses array if it doesn't exist
    }

    // Check if the course ID already exists in the user's courses array
    if (user.courses.includes(_id)) {
      return res.status(400).json({ message: "Course already added to user" });
    }

    user.courses.push(_id);
    await user.save();

    return res.status(200).json({ message: "Course added to user successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "An error occurred" });
  }
};

