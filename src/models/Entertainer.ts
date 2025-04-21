export interface Entertainer {
    entertainerID: number;
    entStageName: string;
    entSSN?: string;
    entStreetAddress?: string;
    entCity?: string;
    entState?: string;
    entZipCode?: string;
    entPhoneNumber?: string;
    entWebPage?: string;
    entEMailAddress?: string;
    dateEntered?: string;
}

export interface EntertainerListItem {
    entertainerID: number;
    entStageName: string;
    bookingCount: number;
    lastBookingDate?: string;
}
