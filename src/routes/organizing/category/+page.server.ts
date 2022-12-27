import type {Actions, PageServerLoad} from "./$types";
import repository from "$lib/repository/organizing/OrganizingRepository";
import type {OrganizationalCategory} from "@prisma/client";

export const load: PageServerLoad = async ({params}) => {
    return {
        categories: await repository.getAllCategories()
    };
}

export const actions: Actions = {
    createCategory: async ({request}) => {
        const formData = await request.formData();
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const color = formData.get("color") as string;
        const icon = formData.get("icon") as string;

        const category = {
            name: name,
            description: description,
            color: color,
            icon: icon
        } as OrganizationalCategory;
        const result = await repository.addNewCategory(category);
        return {
            result,
            success: true
        };
    }
}

