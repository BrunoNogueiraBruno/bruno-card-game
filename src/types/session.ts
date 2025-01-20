export interface ISession {
    currentUser: {
        id: string,
        role: "host" | "client"
    },
    listOfUsers: string[],
}