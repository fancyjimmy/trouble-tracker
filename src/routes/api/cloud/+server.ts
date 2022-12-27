import type {RequestHandler} from "@sveltejs/kit";
import repository from "$lib/db";

export const POST = (async ({request}) => {
    const cloud = await request.json();

    const newCloud = await repository.createCloud(cloud);
    console.log(newCloud);

    return new Response(JSON.stringify(newCloud));
}) satisfies RequestHandler;