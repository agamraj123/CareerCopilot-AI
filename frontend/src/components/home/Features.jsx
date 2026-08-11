import {
    Brain,
    FileSearch,
    FileText,
    BarChart3,
} from "lucide-react";

import { motion } from "framer-motion";

const features = [

    {

        title:"AI Resume Analysis",

        description:"Receive an ATS score, identify strengths and weaknesses, and get personalized suggestions.",

        icon:<Brain size={34}/>
    },

    {

        title:"ATS Optimization",

        description:"Improve your resume for Applicant Tracking Systems before applying.",

        icon:<FileSearch size={34}/>
    },

    {

        title:"Job Match Analysis",

        description:"Compare your resume with any job description and discover missing skills.",

        icon:<BarChart3 size={34}/>
    },

    {

        title:"AI Cover Letter",

        description:"Generate customized cover letters in seconds using AI.",

        icon:<FileText size={34}/>
    }

];

const Features = ()=>{

    return(

<section id="features" className="py-24 bg-slate-50">

<div className="max-w-7xl mx-auto px-6">

<div className="text-center">

<h2 className="text-5xl font-bold">

Everything You Need

</h2>

<p className="text-slate-600 mt-5 text-xl">

One platform for every step of your placement journey.

</p>

</div>

<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

{

features.map((feature,index)=>(

<motion.div

key={index}

whileHover={{

y:-8

}}

className="bg-white rounded-2xl p-8 shadow-sm border"

>

<div className="text-blue-600">

{feature.icon}

</div>

<h3 className="text-xl font-bold mt-6">

{feature.title}

</h3>

<p className="text-slate-600 mt-4 leading-7">

{feature.description}

</p>

</motion.div>

))

}

</div>

</div>

</section>

);

};

export default Features;