import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { ScrollArea, Table, Pagination, Group, Image } from "@mantine/core";
import {
    List,
    EditButton,
    ShowButton,
    DeleteButton,
    EmailField,
    BooleanField,
    DateField,
    TagField,
} from "@refinedev/mantine";

export const UserList: React.FC<IResourceComponentsProps> = () => {
    const columns = React.useMemo<ColumnDef<any>[]>(
        () => [
            {
                id: "id",
                accessorKey: "id",
                header: "Id",
            },
            {
                id: "firstName",
                accessorKey: "firstName",
                header: "First Name",
            },
            {
                id: "lastName",
                accessorKey: "lastName",
                header: "Last Name",
            },
            {
                id: "email",
                accessorKey: "email",
                header: "Email",
                cell: function render({ getValue }) {
                    return <EmailField value={getValue<any>()} />;
                },
            },
            {
                id: "status",
                accessorKey: "status",
                header: "Status",
                cell: function render({ getValue }) {
                    return <BooleanField value={getValue<any>()} />;
                },
            },
            {
                id: "birthday",
                accessorKey: "birthday",
                header: "Birthday",
                cell: function render({ getValue }) {
                    return <DateField value={getValue<any>()} />;
                },
            },
            {
                id: "skills",
                accessorKey: "skills",
                header: "Skills",

                cell: function render({ getValue }) {
                    return (
                        <Group spacing="xs">
                            {getValue<any[]>()?.map((item, index) => (
                                <TagField value={item} key={index} />
                            ))}
                        </Group>
                    );
                },
            },
            {
                id: "avatar",
                accessorKey: "avatar",
                header: "Avatar",

                cell: function render({ getValue }) {
                    try {
                        return (
                            <Group spacing="xs">
                                {getValue<any[]>()?.map((item, index) => (
                                    <Image
                                        src={item?.url}
                                        key={index}
                                        sx={{ maxWidth: "100px" }}
                                    />
                                ))}
                            </Group>
                        );
                    } catch (error) {
                        return null;
                    }
                },
            },
            {
                id: "actions",
                accessorKey: "id",
                header: "Actions",
                cell: function render({ getValue }) {
                    return (
                        <Group spacing="xs" noWrap>
                            <ShowButton
                                hideText
                                recordItemId={getValue() as string}
                            />
                            <EditButton
                                hideText
                                recordItemId={getValue() as string}
                            />
                        </Group>
                    );
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
