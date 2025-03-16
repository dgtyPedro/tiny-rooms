export default function MessageComponent(props: { iid?: string, name: string, text: string }) {
    const {iid, text, name} = props

    if(iid === localStorage.getItem("iid")) {
        return (
            <div className="flex items-end justify-end space-x-2">
                <div className="p-2 rounded-lg bg-blue-500 text-white">
                    <p>{text}</p>
                </div>
            </div>
        );
    }
    return (
        <div className="flex items-end space-x-2">
            <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                <p className="text-sm text-secondary-foreground">{name}</p>
                <p>{text}</p>
            </div>
        </div>
    )
}