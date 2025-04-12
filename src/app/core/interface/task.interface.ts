export interface TaskData{
    id?: number,
    name: string,
    isFavourite?: boolean,
    listOfTasks: ItemList[],
}

export interface ItemList {
    id: number,
    label: string,
    status: boolean,
    daily?: boolean
}

export interface SlotAndID  {
    slot: number,
    id: number,
}