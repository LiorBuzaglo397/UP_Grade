import User from "../model/User";
import brcypt from 'bcryptjs' ;

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
    const {user_ID , user_Password , first_Name , last_Name ,email , user_Description , user_Approved} = req.body;
    

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
        user_Password : hashedPassword,
        first_Name ,
        last_Name ,
        email ,
        user_Description ,
        user_Approved
    });


    try{
        await user.save();

    }catch(err){
       return console.log(err);
    }
    return res.status(201).json({user});
};

export const login = async(req , res , next) => {
    const { user_Password ,email } = req.body;
    let existingUser;
    try{
        existingUser = await  User.findOne({email});
    }catch(err){
        return console.log(err);
    }
    if(!existingUser){ //if the user is already singUp to the website
        return res
            .status(404)
            .json({message : "Couldn't Find User By This Email"});
    }
    
    const isPasswordCorrect = brcypt.compareSync(user_Password , existingUser.user_Password);
    if(!isPasswordCorrect){
       return res.status(400).json({message : "Incorrect Password"});
    }
    return res.status(200).json({message : "Successfull"});

};