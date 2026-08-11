import { motion } from "framer-motion";

const StatCard = ({
    title,
    value,
    icon,
}) => {

    return (

        <motion.div

            whileHover={{

                y:-4

            }}

            className="bg-white rounded-xl shadow-sm border p-5"

        >

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-gray-500">

                        {title}

                    </p>

                    <h2 className="text-3xl font-bold mt-2">

                        {value}

                    </h2>

                </div>

                <div>

                    {icon}

                </div>

            </div>

        </motion.div>

    );

};

export default StatCard;