const mongoose = require("mongoose"); 
const AmazManagerSchema = mongoose.Schema({
    product_id: {
        type: String,
        required: true,
    },
    product_name: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: false,
    },
    discounted_price: {
        type: String,
        required: false,
    },
    actual_price: {
        type: String,
        required: false,
    },
    discount_percentage: {
        type: String,
        required: false,
    },
    rating: {   
        type: String,
        required: false,
    },
    rating_count: {
        type: String,
        required: false,
    },
    about_product:{
        type: String,
        required: false,
    },
    user_id: {
        type: String,
        required: false,
    },  
    user_name: {
        type: String,
        required: false,
    },  
    review_id: {
        type: String,
        required: false,
    },
    review_title: {
        type: String,
        required: false,
    },
    review_content: {   
        type: String,
        required: false,
    },
    img_link: {
        type: String,
        required: false,
    },
    product_link: {
        type: String,
        required: false,
    }
});
module.exports = mongoose.model("AmazManager", AmazManagerSchema);
