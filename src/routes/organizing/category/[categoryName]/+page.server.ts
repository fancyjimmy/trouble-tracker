import type {Actions, PageServerLoad} from "./$types";
import repository from "$lib/repository/organizing/OrganizingRepository";
import type {OrganizationalItem} from "@prisma/client";

export const load: PageServerLoad = async ({params}) => {
    return {
        categories: await repository.getAllCategories(),
        category: await repository.getCategoryByName(params.categoryName),
        items: await repository.getItemsFromCategory(params.categoryName)
    };
}

export const actions: Actions = {
    newItem: async ({request, params}) => {
        const formData = await request.formData();
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const count = formData.get("count") as string;
        const color = formData.get("color") as string;
        const icon = formData.get("icon") as string;

        const item = {
            name: name,
            description: description,
            categoryName: params.categoryName,
            count: count ? parseInt(count) : 1,
            color: color,
            icon: icon
        } as OrganizationalItem;

        const result = await repository.createNewItem(item);
        return {
            result,
            success: true
        }
    }
}