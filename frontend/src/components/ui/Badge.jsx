const Badge = ({

    children,

}) => {

    return (

        <span

            className="
                inline-flex
                items-center
                rounded-full
                bg-blue-100
                px-4
                py-2
                text-sm
                font-medium
                text-blue-700
            "

        >

            {children}

        </span>

    );

};

export default Badge;