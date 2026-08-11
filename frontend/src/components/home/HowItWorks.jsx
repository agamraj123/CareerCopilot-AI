import { Upload, Brain, Trophy } from "lucide-react";

const steps = [

{
title:"Upload Resume",
icon:<Upload size={42}/>,
description:"Upload your resume securely in PDF format."
},

{
title:"AI Analysis",
icon:<Brain size={42}/>,
description:"CareerCopilot analyzes ATS score, skills, and improvement areas."
},

{
title:"Get Interview Ready",
icon:<Trophy size={42}/>,
description:"Improve your resume, match jobs, and generate tailored cover letters."
}

];

const HowItWorks=()=>{

return(

<section id="how-it-works" className="py-24 bg-white">

<div className="max-w-7xl mx-auto px-6">

<div className="text-center">

<h2 className="text-5xl font-bold">

How It Works

</h2>

<p className="text-slate-600 mt-5 text-xl">

Only three simple steps.

</p>

</div>

<div className="grid md:grid-cols-3 gap-16 mt-20">

{

steps.map((step,index)=>(

<div

key={index}

className="text-center"

>

<div className="w-20 h-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-600">

{step.icon}

</div>

<h3 className="text-2xl font-bold mt-10">

{step.title}

</h3>

<p className="text-slate-600 mt-5 leading-8">

{step.description}

</p>

</div>

))

}

</div>

</div>

</section>

);

};

export default HowItWorks;