export interface TaskData{
    id?: number,
    name: string,
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