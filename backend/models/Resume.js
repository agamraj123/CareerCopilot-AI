const mongoose = require("mongoose");
const recommendationSchema =
require("./schemas/recommendationSchema");
const skillSchema = new mongoose.Schema(

{

    name:{

        type:String,

        required:true

    },

    level:{

        type:String,

        enum:[

            "Beginner",

            "Intermediate",

            "Advanced"

        ],

        default:"Intermediate"

    },

    confidence:{

        type:Number,

        min:0,

        max:100,

        default:80

    }

},

{

    _id:false

});
const careerSuggestionSchema = new mongoose.Schema(

{

    role:{

        type:String,

        required:true

    },

    matchPercentage:{

        type:Number,

        min:0,

        max:100,

        required:true

    },

    reason:{

        type:String,

        required:true

    }

},

{

    _id:false

});

const interviewQuestionSchema = new mongoose.Schema(

{

    question:{

        type:String,

        required:true

    },

    difficulty:{

        type:String,

        enum:[

            "Easy",

            "Medium",

            "Hard"

        ],

        default:"Medium"

    },

    topic:{

        type:String,

        required:true

    }

},

{

    _id:false

});

const aiAnalysisSchema = new mongoose.Schema({

    resumeScore:{
        type:Number,
        min:0,
        max:100,
        default:0
    },

    technicalSkills: {
    type: [skillSchema],
    default: []
},

    softSkills:{
    type:[skillSchema],
    default:[]
},

    missingSkills: {
    type: [recommendationSchema],
    default:[]
},

    strengths:{
    type:[recommendationSchema],
    default:[]
},

    weaknesses: {
        type:[recommendationSchema],
    default:[]
    },

    careerSuggestions: {
        type: [careerSuggestionSchema],
        default: []
    },

    interviewQuestions: {
        type: [interviewQuestionSchema],
        default: []
    },

    learningRoadmap: {
        type:[recommendationSchema],
    default:[]
    },

    atsSuggestions: {
        type:[recommendationSchema],
    default:[]
    },

    metadata:{

        model:{
            type:String,
            default:"gemini-2.5-flash"
        },

        processingTime:{
            type:Number,
            default:0
        },

        analyzedAt:{
            type:Date,
            default:Date.now
        }

    }

},
{
    _id:false
});

const resumeSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    fileName:{
        type:String,
        required:true
    },

    resumeText:{
        type:String,
        required:true
    },

    aiAnalysis:{
        type:aiAnalysisSchema,
        default:null
    }

},
{
    timestamps:true
});

resumeSchema.index({ userId: 1 }, { unique: true });

module.exports =
mongoose.model("Resume",resumeSchema);