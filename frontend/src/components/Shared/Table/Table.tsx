import TableHead from "./TableHead";
import TableRow from "./TableRow";

export type TableHeadType = {
	key: string;
	title: string;
}

export type EventType = {
    id: string;
    title: string;
    description: string;
    startTime: string;
    durationInMin: number;
    location: string;
}


type TableType = {
	theadData: TableHeadType[] | [];
	tbodyData: EventType[] | [];
}

const Table = ( { theadData, tbodyData }: TableType ) => {
	let tHead = theadData.map(item => item.title);

	return (
		<div className="flex flex-col">
			<div className="min-w-fit  bg-[#f2f4f6] rounded-md border border-collapse border-slate-200">
				<table className="min-w-full text-left border-hidden border-spacing-0 border-collapse">
					<thead>
						<tr>
							{tHead.map((h: string, i: number) => {
								return <TableHead key={i} item={h} />;
							})}
						</tr>
					</thead>
					<tbody>
						{tbodyData.length > 0 ? (
							tbodyData.map((item: EventType, i: number) => {
								return <TableRow key={item.id} index={i} theadData={theadData} rowItemData={item} />;
							})
						) : (
							<tr>
								<td
									colSpan={theadData.length}
									className="text-center px-4 py-4 font-normal border border-slate-200"
								>
									No data found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Table;
