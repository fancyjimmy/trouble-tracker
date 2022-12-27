import type {Actions, PageServerLoad} from "./$types";
import repository from "$lib/repository/organizing/OrganizingRepository";
import type {OrganizationalLocation} from "@prisma/client";

export const load: PageServerLoad = async () => {

    return {
        locations: repository.getAllLocations(),
    };
}

export const actions: Actions = {
    newLocation: async ({request}) => {
        const formData = await request.formData();
        const name = formData.get("name") as string;
        const locationName = formData.get("locationName") as string;
        const description = formData.get("description") as string;
        const color = formData.get("color") as string;
        const icon = formData.get("icon") as string;

        const location = {
            name: name,
            locationName: locationName,
            description: description,
            color: color,
            icon: icon,
        } as OrganizationalLocation;

        const result = await repository.createNewLocation(location);
        return {
            result,
            success: true
        }
    }
}