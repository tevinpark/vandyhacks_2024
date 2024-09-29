import dbConnect from "@/lib/db-connect";
import {Simple} from "@/models/Simple";

export async function GET(request) {
    try {
        await dbConnect();
        console.log("nn: " + Simple.collection.name);
        const simples = await Simple.find({});
        console.log("simples: ");
        console.log(simples);
        
        return new Response(JSON.stringify(simples), {
            headers: {
                'Content-Type': 'application/json',
            },
        })
    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
