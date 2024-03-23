export interface Product {
    brand: string;
    categories: string;
    countInStock: number;
    dateCreated: string;
    description: string;
    images: string[];
    isFeatured: boolean;
    name: string;
    numReviews: number;
    price: number;
    rating: number;
    _id: string;
}

export interface ApiResponse {
    data: any[];
}
