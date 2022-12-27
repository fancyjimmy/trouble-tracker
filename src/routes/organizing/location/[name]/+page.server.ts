import type {Actions, PageServerLoad} from "./$types";
import repository from "$lib/repository/organizing/OrganizingRepository";
import type {OrganizationalItem} from "@prisma/client";

export const load: PageServerLoad = async ({params}) => {

    return {
        items: repository.getItemsFromLocation(params.name),
        location: repository.getLocationByName(params.name),
        categories: repository.getAllCategories()
    };
}


export const actions : Actions = {
    newItemWithLocation: async ({request, params}) => {
        const formData = await request.formData();
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const color = formData.get("color") as string;
        const icon = formData.get("icon") as string;
        const categoryName = formData.get("category") as string;

        const result = await repository.createItemWithLocation({
            name: name,
            description: description,
            categoryName: categoryName,
            color: color,
            icon: icon,
        } as OrganizationalItem, params.name);

        return {
            result,
            success: true
        }
    }
}