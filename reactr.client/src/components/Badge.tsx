
function Badge(props: { text: string, theme: string }) {
    return (
        <span className={`w-100 badge bg-${props.theme}`}>{ props.text }</span>
    );
}

export default Badge;