const mongoose = require("mongoose");
const recommendationSchema =
new mongoose.Schema(

{

    title:{

        type:String,

        required:true

    },

    priority:{

        type:String,

        enum:[
            "Low",
            "Medium",
            "High",
            "Critical"
        ],

        default:"Medium"

    },

    reason:{

        type:String,

        required:true

    }

},

{

    _id:false

});