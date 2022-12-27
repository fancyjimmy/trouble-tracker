import type {Actions, PageServerLoad} from "./$types";
import repository from "$lib/repository/organizing/OrganizingRepository";
import type {OrganizationalItem} from "@prisma/client";

export const load: PageServerLoad = async ({params}) => {
    const id = parseInt(params.itemId);

    return {
        item: repository.getItemById(id),
        categories: repository.getAllCategories(),
        possibleLocations: repository.getAllLocations(),
        location: repository.getLocationFromItem(id),
        history: repository.getLocationHistoryFromItem(id)
    };
}

export const actions: Actions = {
    moveItem: async ({request, params}) => {
        const formData = await request.formData();
        const locationName = formData.get("name") as string;

        const result = await repository.addLocationToItem(parseInt(params.itemId), locationName);
        return {
            result,
            success: true
        }
    },
    removeItem: async ({params}) => {
        const result = await repository.removeLocationFromItem(parseInt(params.itemId));
        return {
            result,
            success: true
        }
    },
    updateItem: async ({request, params}) => {
        const formData = await request.formData();
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const count = formData.get("count") as string;
        const categoryName = formData.get("categoryName") as string;
        const color = formData.get("color") as string;
        const icon = formData.get("icon") as string;

        const item = {
            id: parseInt(params.itemId),
            name: name,
            description: description,
            categoryName: categoryName,
            count: count ? parseInt(count) : 1,
            color: color,
            icon: icon
        } as OrganizationalItem;

        const result = await repository.updateItem(item);
        return {
            result,
            success: true
        }
    }
}