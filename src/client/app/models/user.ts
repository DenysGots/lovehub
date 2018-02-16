export interface User {
    id: string;
    name: string;
    age: number;
    location: {
        latitude: number,
        longitude: number
    };
    interests: string;
    additInfo: string;
}
