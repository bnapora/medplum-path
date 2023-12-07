import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { ScrollArea, Table, Pagination, Group } from "@mantine/core";
import {
    List,
    EditButton,
    ShowButton,
    DeleteButton,
    BooleanField,
} from "@refinedev/mantine";

export const WsiList: React.FC<IResourceComponentsProps> = () => {
    const columns = React.useMemo<ColumnDef<any>[]>(
        () => [
            {
                id: "label",
                accessorKey: "label",
                header: "Label",
            },
            {
                id: "path",
                accessorKey: "path",
                header: "Path",
            },
            {
                id: "isDrive",
                accessorKey: "isDrive",
                header: "Is Drive",
                cell: function render({ getValue }) {
                    return <BooleanField value={getValue<any>()} />;
                },
            },
            {
                id: "isFolder",
                accessorKey: "isFolder",
                header: "Is Folder",
                cell: function render({ getValue }) {
                    return <BooleanField value={getValue<any>()} />;
                },
            },
            {
                id: "hasSubfolder",
                accessorKey: "hasSubfolder",
                header: "Has Subfolder",
                cell: function render({ getValue }) {
                    return <BooleanField value={getValue<any>()} />;
                },
            },
            {
                id: "ext",
                accessorKey: "ext",
                header: "Ext",
            },
            {
                id: "file",
                accessorKey: "file",
                header: "File",
                cell: function render({ getValue }) {
                    return <BooleanField value={getValue<any>()} />;
                },
            },
        ],
        [],
    );

    const {
        getHeaderGroups,
        getRowModel,
        setOptions,
        refineCore: {
            setCurrent,
            pageCount,
            current,
            tableQueryResult: { data: tableData },
        },
    } = useTable({
        columns,
    });

    setOptions((prev) => ({
        ...prev,
        meta: {
            ...prev.meta,
        },
    }));

    return (
        <List>
            <ScrollArea>
                <Table highlightOnHover>
                    <thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <th key={header.id}>
                                            {!header.isPlaceholder &&
                                                flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext(),
                                                )}
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {getRowModel().rows.map((row) => {
                            return (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </ScrollArea>
            <br />
            <Pagination
                position="right"
                total={pageCount}
                page={current}
                onChange={setCurrent}
            />
        </List>
    );
};
