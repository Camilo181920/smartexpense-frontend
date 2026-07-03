export default function SummaryCard({
    title,
    value,
    color = "bg-blue-600"
}) {

    return (
        <div className="bg-white rounded-xl shadow-md p-6">

            <h3 className="text-gray-500 text-sm">
                {title}
            </h3>

            <div
                className={`mt-4 inline-flex rounded-full px-3 py-1 text-white ${color}`}
            >
                {value}
            </div>

        </div>
    );
}