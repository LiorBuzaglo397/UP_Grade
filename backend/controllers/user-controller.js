import User from "../model/User";

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

export const signup = async(req ,res , next)=>{
    const {user_id , user_password , firstname , lastname ,email , user_description , user_Approved} = req.body;
    

    let existingUser;
    try{
        existingUser = await  User.findOne({user_id});


    }catch(err){
        console.log(err);
    }
    if(existingUser){ //if the user is already singUp to the website
        return res.status(400).json({message : "User Already Exists! Login Instead"})
    }
    const user = new User ({
        user_id ,
        user_password ,
        firstname ,
        lastname ,
        email ,
        user_description ,
        user_Approved
    });

    try{
        await user.save();

    }catch(err){
        console.log(err);
    }
    return res.status(201).json({user});
}