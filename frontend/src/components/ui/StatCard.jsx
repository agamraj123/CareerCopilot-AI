import Card from "./Card";

const StatCard = ({

    icon,

    title,

    value,

    subtitle,

}) => {

    return (

        <Card>

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-slate-500">

                        {title}

                    </p>

                    <h2 className="text-4xl font-bold mt-3">

                        {value}

                    </h2>

                    {

                        subtitle && (

                            <p className="text-sm text-slate-500 mt-2">

                                {subtitle}

                            </p>

                        )

                    }

                </div>

                <div className="text-blue-600">

                    {icon}

                </div>

            </div>

        </Card>

    );

};

export default StatCard;