export interface IMessage {
    sender: string,
    initials: string,
    timestamp: string,
    text: string,
    threadId: number
}

export interface IThreadSummary {
    threadId: number,
    initials: string,
    name: string,
    unreadMessages: IMessage[]
}