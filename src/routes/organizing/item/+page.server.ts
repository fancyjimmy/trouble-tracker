import repository from "$lib/repository/organizing/OrganizingRepository";
import type {Actions, PageServerLoad} from "./$types";
import type {OrganizationalItem} from "@prisma/client";

export const load: PageServerLoad = async ({params}) => {

    return {
        categories: repository.getAllCategories(),
        items: repository.getAllItems(),
        possibleLocations: repository.getAllLocations(),
    };
}

export const actions : Actions = {
    newItemWithLocation: async ({request}) => {
        const formData = await request.formData();
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const color = formData.get("color") as string;
        const icon = formData.get("icon") as string;
        const categoryName = formData.get("category") as string;
        const locationName = formData.get("location") as string;

        const result = await repository.createItemWithLocation({
            name: name,
            description: description,
            categoryName: categoryName,
            color: color,
            icon: icon,
        } as OrganizationalItem, locationName);

        return {
            result,
            success: true
        }
    }
}