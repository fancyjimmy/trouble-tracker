import repository from "$lib/db";
import type {RequestHandler} from "@sveltejs/kit";

export const POST = (async ({request}) => {
    const star = await request.json();

    const newStar = await repository.createCloud(star);
    console.log(star);

    return new Response(JSON.stringify(star));
}) as RequestHandler;