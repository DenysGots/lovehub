export class CreateMessageDto {
    readonly userId: number;
    readonly text: string;
    readonly read: boolean;
    created: Date;
}
