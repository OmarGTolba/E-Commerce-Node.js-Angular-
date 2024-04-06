export interface Product {
    brand_en: string;
    brand_ar: string;
    categories: string;
    countInStock: string;
    dateCreated?: string;
    description_en: string;
    description_ar: string;
    images: File[];
    isFeatured: boolean;
    name_en: string;
    name_ar: string;
    numReviews?: number;
    price: string;
    rating?: number;
    _id?: string;
}

export interface ApiResponse {
    data: any[];
}
