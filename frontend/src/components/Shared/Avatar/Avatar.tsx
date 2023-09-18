export type AvatarType = { 
    id: string;
    name:string;
    className?: string;
}

const colors = [
    "#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", 
    "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"
]

const Avatar = ({id, name, className}: AvatarType) => {
    if(!name) {
        return <div></div>
    }
    
    let colorIndex = name.charCodeAt(0) - 64;
    colorIndex %= 20;

    return (
        <div className={`m-2 w-12 h-12 flex items-center justify-center rounded-full ${className} `} style={{backgroundColor: colors[colorIndex]}}>
            <div className="block m-auto text-center">
                {name}
            </div>
        </div>
    )
}

export default Avatar;