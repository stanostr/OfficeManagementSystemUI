export class Room {
    id: number;
    capacity: number;
    name: string;
}

export class TrainingRoom extends Room {
    projectorAvail:boolean;
    whiteboardAvail:boolean;
}

export class MeetingRoom extends Room {}