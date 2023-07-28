import axios from "axios";

export function ProductsApiLoader(){
    return new Promise(async (resolve, reject)=>{
        const result = await axios.get('http://localhost:4000/product/', {headers: {"Content-Type": "application/json", "Authorization" : "Bearer " + localStorage.getItem("token")}});
        const {error, errorMessage, succesMessage, products} = result.data;

        if(error){
            return resolve({state: {products: []}});
        }
        if(errorMessage){
            return resolve({state: {products: [], errorMessage}});
        }
        if(succesMessage){
            return resolve({state: {products}});
        }

        return resolve({state: {products: []}});
    })
};
export function GetSearchProductsApiLoader(query){
    return new Promise(async (resolve, reject)=>{
        const result = await axios.get(`http://localhost:4000/product/search/${query}`, {headers: {"Content-Type": "application/json", "Authorization" : "Bearer " + localStorage.getItem("token")}});
        const {error, errorMessage, succesMessage, products} = result.data;

        if(error){
            return resolve({state: {products: []}});
        }
        if(errorMessage){
            return resolve({state: {products: [], errorMessage}});
        }
        if(succesMessage){
            return resolve({state: {products}});
        }
        
        return resolve({state: {products: []}});
    })
};
export function OneProductsApiLoader(id){
    return new Promise(async (resolve, reject)=>{
        const result = await axios.get(`http://localhost:4000/product/get/${id}`, {headers: {"Content-Type": "application/json", "Authorization" : "Bearer " + localStorage.getItem("token")}});
        const {error, errorMessage, succesMessage, product} = result.data;
        if(error){
            return resolve({state: {product: {}}});
        }
        if(errorMessage){
            return resolve({state: {product: {}, errorMessage}});
        }
        if(succesMessage){
            return resolve({state: {product}});
        }
        
        return resolve({state: {product: {}}});
    })
};
export function AddReviewInProductApiLoader(id, review){
    return new Promise(async (resolve, reject)=>{
        const result = await axios.post('http://localhost:4000/product/add/review', {id, review}, {headers: {"Content-Type": "application/json", "Authorization" : "Bearer " + localStorage.getItem("token")}});
        const {error, errorMessage, succesMessage, product} = result.data;

        if(error){
            return resolve({state: {product: {}}});
        }
        if(errorMessage){
            return resolve({state: {product, errorMessage}});
        }
        if(succesMessage){
            return resolve({state: {product, succesMessage}});
        }

        return resolve({state: {product: {}}});
    })
};
export function AddProductApiLoader({name, productImg, price, category, description}){
    return new Promise(async (resolve, reject)=>{
        const formData = new FormData();
        formData.append("productImg", productImg);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("description", description);

        const result = await axios.post('http://localhost:4000/product/add', formData, {headers: {"Content-Type": "multipart/form-data", "Authorization" : "Bearer " + localStorage.getItem("token")}});
        const {error, errorMessage, succesMessage, products} = result.data;
        if(error){
            return resolve({state: {products: []}});
        }
        if(errorMessage){
            return resolve({state: {products: [], errorMessage}});
        }
        if(succesMessage){
            return resolve({state: {products, succesMessage}});
        }

        return resolve({state: {products: []}});
    })
};
export function UpdateProductwithPhotoApiLoader(id, {name, productImg, price, category, description, oldImg}){
    return new Promise(async (resolve, reject)=>{
        const formData = new FormData();
        formData.append("productImg", productImg);
        formData.append("oldImg", oldImg);
        formData.append("id", id);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("description", description);

        const result = await axios.post('http://localhost:4000/product/update/photo', formData, {headers: {"Content-Type": "multipart/form-data", "Authorization" : "Bearer " + localStorage.getItem("token")}});
        const {error, errorMessage, succesMessage, product={}} = result.data;
        if(error){
            return resolve({state: {product}});
        }
        if(errorMessage){
            return resolve({state: {product, errorMessage}});
        }
        if(succesMessage){
            return resolve({state: {product, succesMessage}});
        }

        return resolve({state: {product}});
    })
};
export function UpdateProductApiLoader(data){
    return new Promise(async (resolve, reject)=>{
        const result = await axios.post('http://localhost:4000/product/update', data, {headers: {"Content-Type": "application/json", "Authorization" : "Bearer " + localStorage.getItem("token")}});
        
        const {error, errorMessage, succesMessage, product={}} = result.data;
        if(error){
            return resolve({state: {product}});
        }
        if(errorMessage){
            return resolve({state: {product, errorMessage}});
        }
        if(succesMessage){
            return resolve({state: {product, succesMessage}});
        }

        return resolve({state: {product}});
    })
};
export function DeleteProductApiLoader(data){
    return new Promise(async (resolve, reject)=>{
        const result = await axios.post('http://localhost:4000/product/delete', data, {headers: {"Content-Type": "application/json", "Authorization" : "Bearer " + localStorage.getItem("token")}});
        const {error, errorMessage, succesMessage, products} = result.data;
        if(error){
            return resolve({state: {products: []}});
        }
        if(errorMessage){
            return resolve({state: {products: [], errorMessage}});
        }
        if(succesMessage){
            return resolve({state: {products, succesMessage}});
        }

        return resolve({state: {products: []}});
    })
};