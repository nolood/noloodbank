
const CardIcon = () => {
    return (
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <defs>
                <polygon id="card-a" points="0 .069 0 3 18 3 18 0"/>
                <path id="card-c" d="M18,5 L18,2 L2,2 L2,5 L18,5 Z M18,7 L2,7 L2,13 L18,13 L18,7 Z M2,0 L18,0 C19.1045695,0 20,0.8954305 20,2 L20,13 C20,14.1045695 19.1045695,15 18,15 L2,15 C0.8954305,15 0,14.1045695 0,13 L0,2 C0,0.8954305 0.8954305,0 2,0 Z M13,9 L15,9 C15.5522847,9 16,9.44771525 16,10 C16,10.5522847 15.5522847,11 15,11 L13,11 C12.4477153,11 12,10.5522847 12,10 C12,9.44771525 12.4477153,9 13,9 Z"/>
                </defs>
            <g fill="none" fillRule="evenodd" transform="translate(2 5)">
                <g transform="translate(1 3)">
                    <mask id="card-b" fill="#ffffff">
                        <use href="#card-a"/>
                    </mask>
                    <use fill="#D8D8D8" href="#card-a"/>
                    <g fill="#FFA0A0" mask="url(#card-b)">
                        <rect width="24" height="24" transform="translate(-3 -8)"/>
                    </g>
                </g>
                <mask id="card-d" fill="#ffffff">
                    <use href="#card-c"/>
                </mask>
                <use fill="#000000" fillRule="nonzero" href="#card-c"/>
                <g fill="#7600FF" mask="url(#card-d)">
                    <rect width="24" height="24" transform="translate(-2 -5)"/>
                </g>
            </g>
        </svg>
    );
};

export default CardIcon;