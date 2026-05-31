const { Connection, connect } = require("mongoose")
const User = require("../models/user.model")
const sendConnection = async (req,res)=>{
    try {
        let {id} = req.params // recievers id
        let sender = req.userId
        let user = await User.findById(sender)

        if(sender == id){
            return res.status(400).json({message:"you can not send request yourself"})
        }

        if(user.connection.includes(id)){
            return res.status(400).json({message:"you are already connected"})
        }

        let existingConnection = await Connection.findOne({
            sender,
            receiver:id,
            status:"pending"
        })

        if(existingConnection){
            return  res.status(400).json({message:"request already exist"})
        }
        let newRequest = await Connection.create({
            sender,
            receiver:id
        })

        return res.status(200).json(newRequest)
    } catch (error) {
        return res.status(500).json({message:"sendconnection error ",error})
    }
}

const acceptConnection = (req,res)=>{
    try {
        const {connectionId} = req.params //connection id
        let connection = await Connection.findById(connectionId)

        if(!connection){
            return res.status(400).json({message:"connection does not exist"})
        }

        if(connection.status != "pending"){
            return res.status(400).json({message:"request under process"})
        }

        connection.status = "accepted"
        await connection.save()

        // update the connection array in both sender and receiver
        await User.findByIdAndUpdate(req.userId,{
            $addToSet:{connection:connection.sender._id}
        })

        await User.findByIdAndUpdate(connection.sender._id,{
            $addToSet:{connection:req.userId}
        })

        return res.status(200).json({message:"connection accepted"})
    } catch (error) {
        return res.status(500).json({message:"connection accepted error : ",error})
    }
}

const rejectConnection = (req,res)=>{
    try {
        const {connectionId} = req.params //connection id
        let connection = await Connection.findById(connectionId)

        if(!connection){
            return res.status(400).json({message:"connection does not exist"})
        }

        if(connection.status != "pending"){
            return res.status(400).json({message:"request under process"})
        }

        connection.status = "rejected"
        await connection.save()

        return res.status(200).json({message:"connection rejected"})
    } catch (error) {
        return res.status(500).json({message:"connection rejected error : ",error})
    }
}


module.exports = {sendConnection,acceptConnection,rejectConnection}