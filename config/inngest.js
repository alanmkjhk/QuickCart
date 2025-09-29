import { Inngest } from "inngest";
import connectDB from "./db";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });
// Inngest SDK docs: https://docs.inngest.com/sdk/overview

export const syncUserCreation = inngest.createFunction(
    {
        id: 'syns-user-from-clerk'
    },
    { event: 'clerk/user.created' },
    async ({ event}) => {
        const {id, email_addresses, first_name, profile_image_url} = event.data
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            imageUrl: image_url
        }
        await connectDB()
        await User.create(userData)      

    }


)
// Inngest Function to update data in database
export const syncUserUpdate = inngest.createFunction(
    {
        id: 'update-user-from-clerk'
    },
    { event: 'clerk/user.updated' },
    async ({ event}) => {
        const {id, email_addresses, first_name, profile_image_url} = event.data
        const userData = {
            _id: id,        
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            imageUrl: image_url
        }
        await connectDB()
        await User.findByIdAndUpdate(id, userData)
    }
)

// Inngest Function to delete data in database
export const syncUserDeletion = inngest.createFunction(
    {
        id: 'delete-user-from-clerk'
    },  
    { event: 'clerk/user.deleted' },
    async ({ event}) => {
        const {id} = event.data
        await connectDB()
        await User.findByIdAndDelete(id)
    }   
)