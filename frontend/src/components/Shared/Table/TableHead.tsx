import React from "react";

const TableHead = ({ item }: { item : string }) => {
	return (
		<th
			title={item}
			scope="col"
			className="text-md font-medium px-4 py-4 border border-slate-200"
		>
			{item}
		</th>
	);
};

export default TableHead;
