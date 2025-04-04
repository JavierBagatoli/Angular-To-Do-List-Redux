export interface TaskData{
    name: string,
    listOfTasks: ItemList[],
}

export interface ItemList {
id: number,
label: string,
status: boolean,
}

export interface SlotAndID  {
    slot: number,
    id: number,
}