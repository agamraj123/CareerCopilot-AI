import { motion } from "framer-motion";

const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Adobe",
    "Atlassian",
    "Uber",
];

const Companies = () => {
    return (
        <section className="bg-white py-20">

            <div className="max-w-7xl mx-auto px-6">

                <motion.h2

                    initial={{opacity:0,y:20}}
                    whileInView={{opacity:1,y:0}}
                    viewport={{once:true}}

                    className="text-center text-slate-500 uppercase tracking-widest font-semibold"

                >
                    Designed for Aspirants Targeting
                </motion.h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-12">

                    {companies.map((company)=>(

                        <motion.div

                            key={company}

                            whileHover={{scale:1.05}}

                            className="bg-slate-50 rounded-xl p-5 text-center border"

                        >

                            <h3 className="font-bold text-lg">

                                {company}

                            </h3>

                        </motion.div>

                    ))}

                </div>

            </div>

        </section>
    );
};

export default Companies;