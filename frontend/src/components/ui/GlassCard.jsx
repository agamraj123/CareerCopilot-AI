const GlassCard = ({

    children,

    className = "",

}) => {

    return (

        <div

            className={`
                backdrop-blur-xl
                bg-white/70
                border
                border-white/40
                rounded-3xl
                shadow-xl
                ${className}
            `}

        >

            {children}

        </div>

    );

};

export default GlassCard;