import dbConnect from "@/lib/db-connect";
import {Prof} from "@/models/Prof";

export async function GET(request) {
    try {
        await dbConnect();

        const url = new URL(request.url);
        const department = url.searchParams.get('department');

        const query = department ? { Department: department.split(' ')[0] } : {};

        const professors = await Prof.find(query);
        
        return new Response(JSON.stringify(professors), {
            headers: {
                'Content-Type': 'application/json',
            },
        })
    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
