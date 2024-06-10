import { getServerSession } from "next-auth";
import {authOptions} from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {User} from "next-auth";

export async function POST (request: Request){
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user:User = session?.user as User

    if(!session || !session.user){
        return Response.json(
            {
              succees: false,
              message:"Not aunthenticated",
            },
            { status: 401 }
          );
    }

    const userID = user._id;
    const {acceptMessages}= await request.json()

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userID,
            {isAcceptingMessage:acceptMessages},
            {new:true}
        )
        if(!updatedUser){
            return Response.json(
                {
                  succees: false,
                  message:"failed to update user status to accept messages", 
                  updatedUser
                },
                { status: 401 }
              );
        }
        return Response.json(
            {
              succees: true,
              message:"Message attenptance status updated successfully",
            },
            { status: 401 }
          );
    } catch (error) {
        console.log("failed to update user status to accept messages")
        return Response.json(
            {
              succees: false,
              message:"failed to update user status to accept messages",
            },
            { status: 500 }
          );
    }
}

export async function GET(request: Request) {
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user:User = session?.user as User

    if(!session || !session.user){
        return Response.json(
            {
              succees: false,
              message:"Not aunthenticated",
            },
            { status: 401 }
          );
    }

    const userId = user._id;

    try {
        const foundUser = await UserModel.findById(userId)
        if(!foundUser){
            return Response.json(
                {
                  succees: false,
                  message:"User not Found", 
                },
                { status: 401 }
              );
        }
        return Response.json(
            {
              succees: true,
              isAcceptingMessages:foundUser.isAcceptingMessage
            },
            { status: 200 }
          );
    } catch (error) {
        console.log("failed to update user status to accept messages")
        return Response.json(
            {
              succees: false,
              message:"Error in getting message atteptance status",
            },
            { status: 500 }
          );
    }
}