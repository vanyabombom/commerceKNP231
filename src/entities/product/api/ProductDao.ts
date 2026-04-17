import BaseDao from "../../config/BaseDao";
import type ProductPageType from "../model/ProductPageType";
const p1 = { 
    id: "1", 
    title: "Apple iPhone 17 Pro Max 256GB (Cosmic Orange)", 
    slug: "apple-iphone-17-pro-max-256gb-orange",
    price: 73499, discount: 6050, rating: 5, 
    imageUrl: "/img/CosmicOrange-1397x1397.png.webp",
    stock: 10
};
const p2 = { 
    id: "2", title: "Навушники Apple AirPods Pro 3 (MFHP4) (2025)", 
    slug: "navushnyky-apple-airpods-pro-3",
    price: 11899, discount: 2200, rating: 5, 
    imageUrl: "/img/vbfbg-1397x1397.png.webp",
    stock: 3
};
const p3 = { 
    id: "814897", title: "Apple iPhone 15 256GB (Pink)", 
    slug: "apple-iphone-15-256gb--pink-",
    price: 37999, discount: 2800, rating: 5, 
    imageUrl: "/img/pink (1)-1397x1397.jpeg.webp",
    stock: 0
};
const p4 = { 
    id: "842447", title: "MacBook Air 13 Retina, Midnight, 256GB, 10 CPU / 8 GPU, 16GB RAM with Apple M4 (2025) (MW123)", 
    slug: "macbook-air-13-retina-midnight-256gb-8-cpu--10-gpu-16gb-ram-with-apple-m4-2025-mw123",
    price: 41999, discount: 8000, rating: 1, 
    imageUrl: "/img/midnight-1-1397x1397.png.webp",
    stock: 10
};
const p5 = { 
    id: "855417", title: "Apple iPhone 17 Pro Max 512GB (Deep Blue)", 
    slug: "apple-iphone-17-pro-max-512gb-dark-blue",
    price: 83699, discount: 13050, rating: 3, 
    imageUrl: "/img/deepBlue-(4)-1397x1397.png.webp",
    stock: 3
};
const p6 = { 
    id: "842247", title: "Apple iPad 11 128GB, Wi-Fi (Silver) (2025) (MD3Y4)", 
    slug: "apple-ipad-11-128gb-wi-fi-silver-2025-md3y4",
    price: 17199, discount: 1300, rating: 5, 
    imageUrl: "/img/ipad-2022-hero-silver-wifi-selec-1397x1397.jpg.webp",
    stock: 10
};
// 
export default class ProductDao {
    static getProduct(slugOrId:string): Promise<ProductPageType> {
        return new Promise((resolve, reject) => {
            BaseDao.request("api://product/" + slugOrId)
            .then(r => r.json())
            .then(j => {
                if(j.meta.dataType == 'object') {
                    resolve(j.data);
                }
                else {
                    reject(j);
                }
            })
        });
    }

    static getProductMock(slugOrId:string): Promise<ProductPageType> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const allProducts = [p1, p2, p3, p4, p5, p6];
                const p = allProducts.find(p => p.slug == slugOrId || p.id == slugOrId);
                if(!p) {
                    reject("Not Found: " + slugOrId);
                }
                else {
                    resolve({
                        product: p,
                        recommended: allProducts.filter(x => x.id != p.id)
                    });
                }                
            }, 700);
        });
    }
}