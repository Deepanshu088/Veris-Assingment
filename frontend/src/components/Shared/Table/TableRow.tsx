import { EventType, TableHeadType } from "./Table";

const TableRow = ({ rowItemData, theadData, index }: { rowItemData: EventType, theadData: TableHeadType[], index: number}) => {
	return (
		<>
			<tr>
				{theadData?.map((item: TableHeadType) => {
					return (
						<td
							key={item.key}
							className="px-4 py-4 font-normal border border-slate-200"
						>
							<div>{item.key === "index" ? index+1 :  (rowItemData as any)[item.key]}</div>
						</td>
					);
				})}
			</tr>
		</>
	);
};

export default TableRow;
