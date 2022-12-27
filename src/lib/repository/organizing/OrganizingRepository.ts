import type {OrganizationalLocation, OrganizationalLocationHistory, OrganizationalCategory, OrganizationalItem} from "@prisma/client";
import type {PrismaClient} from "@prisma/client";
import db from "$lib/db";

export interface OrganizingRepository {
    getAllLocations(): Promise<OrganizationalLocation[]>;

    getAllItems(): Promise<OrganizationalItem[]>;

    getAllCategories(): Promise<OrganizationalCategory[]>;

    getItemsFromLocation(locationName: string): Promise<OrganizationalItem[]>;

    getItemsFromCategory(typeName: string): Promise<OrganizationalItem[]>;

    getLocationFromItem(itemId: number): Promise<OrganizationalLocation | null>;


    createNewItem(item: OrganizationalItem): Promise<OrganizationalItem>;
    updateItem(item: OrganizationalItem): Promise<OrganizationalItem>;

    addLocationToItem(itemId: number, locationName: string): Promise<OrganizationalLocation>;

    addNewCategory(category: OrganizationalCategory): Promise<OrganizationalCategory>;
    createNewLocation(location: OrganizationalLocation): Promise<OrganizationalLocation>;

    getItemById(itemId: number): Promise<OrganizationalItem | null>;

    removeLocationFromItem(itemId: number): Promise<null>;
    getLocationHistoryFromItem(itemId: number): Promise<OrganizationalLocationHistory[]>;
    getLocationByName(locationName: string): Promise<OrganizationalLocation | null>;

    getCategoryByName(categoryName: string): Promise<OrganizationalCategory | null>;
    createItemWithLocation(item: OrganizationalItem, locationName: string): Promise<OrganizationalItem>;
}

export class OrganizingRepositoryImpl implements OrganizingRepository {
    constructor(
        private db: PrismaClient
    ) {
    }

    async getAllLocations(): Promise<OrganizationalLocation[]> {
        return await this.db.organizationalLocation.findMany();
    }

    async getLocationByName(locationName: string): Promise<OrganizationalLocation | null> {
        return await this.db.organizationalLocation.findUnique({
            where: {
                name: locationName
            }
        });
    }

    async getAllItems(): Promise<OrganizationalItem[]> {
        return await this.db.organizationalItem.findMany();
    }

    async getAllCategories(): Promise<OrganizationalCategory[]> {
        return await this.db.organizationalCategory.findMany();
    }

    async getItemsFromLocation(locationName: string): Promise<OrganizationalItem[]> {
        const history = await this.db.organizationalLocationHistory.findMany({
            where: {
                locationName: locationName,
                end: null
            },
            include: {
                item: true
            }
        });

        return history.map(h => h.item);
    }

    async getItemsFromCategory(categoryName: string): Promise<OrganizationalItem[]> {
        return await this.db.organizationalItem.findMany({
            where: {
                categoryName: categoryName
            }
        });
    }

    async getLocationFromItem(id: number): Promise<OrganizationalLocation |  null> {
        const history = await this.db.organizationalLocationHistory.findMany({
            where: {
                itemId: id,
                end: null
            },
            include: {
                location: true
            }
        });

        return history[0] ? history[0].location : null;
    }

    async createNewItem(item: OrganizationalItem): Promise<OrganizationalItem> {
        return await this.db.organizationalItem.create({
            data: item
        });
    }

    async addLocationToItem(itemId: number, locationName: string): Promise<OrganizationalLocation> {

        const item = await this.db.organizationalLocationHistory.updateMany({
            data: {
                end: new Date()
            },
            where: {
                itemId: itemId,
                end: null
            }
        });

        console.log("item", item);
        console.log("locationName", locationName);
        const created = await this.db.organizationalLocationHistory.create({
            data: {
                itemId: itemId,
                locationName: locationName
            },
            include: {
                location: true
            }
        });

        return created.location;
    }

    async addNewCategory(category: OrganizationalCategory): Promise<OrganizationalCategory> {
        return await this.db.organizationalCategory.create({
            data: category
        });
    }

    async getItemById(itemId: number): Promise<OrganizationalItem | null> {
        return await this.db.organizationalItem.findUnique({
            where: {
                id: itemId
            }
        });
    }


    async updateItem(item: OrganizationalItem): Promise<OrganizationalItem> {
        return await this.db.organizationalItem.update({
            where: {
                id: item.id
            },
            data: item
        });
    }

    async removeLocationFromItem(itemId: number): Promise<null> {
        const history = await this.db.organizationalLocationHistory.updateMany({
            data: {
                end: new Date()
            },
            where: {
                itemId: itemId,
                end: null
            }
        });


        return null;
    }

    async getLocationHistoryFromItem(itemId: number): Promise<OrganizationalLocationHistory[]> {
        return await this.db.organizationalLocationHistory.findMany({
            where: {
                itemId: itemId
            }
        });
    }

    async createNewLocation(location: OrganizationalLocation): Promise<OrganizationalLocation> {
        return await this.db.organizationalLocation.create({
            data: location
        });
    }


    async getCategoryByName(categoryName: string): Promise<OrganizationalCategory | null> {
        return await this.db.organizationalCategory.findUnique({
            where: {
                name: categoryName
            }
        });
    }

    async createItemWithLocation(item: OrganizationalItem, locationName: string): Promise<OrganizationalItem> {
        const createdItem = await this.db.organizationalItem.create({
            data: item
        });

        await this.db.organizationalLocationHistory.create({
            data: {
                itemId: createdItem.id,
                locationName: locationName
            }
        });

        return createdItem;
    }
}

const repository = new OrganizingRepositoryImpl(db);

export default repository;