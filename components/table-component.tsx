"use client"
import React, { useState, useEffect, useMemo, useCallback } from "react"
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    type MRT_ColumnFiltersState,
    type MRT_PaginationState,
    type MRT_SortingState,
} from "material-react-table"
import { Box, Chip, Avatar, Typography } from "@mui/material"
import { debounce } from "lodash"
import { userData } from "@/data/user-data"


export type User = {
    id: string
    name: string
    username: string
    status: string
    role: string
    email: string
    teams: string[]
    age: number
    avatar: string
}

export default function TableComponent() {
    const [data, setData] = useState<User[]>([])
    const [globalFilter, setGlobalFilter] = useState("")
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])
    const [sorting, setSorting] = useState<MRT_SortingState>([])
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })
    const [rowSelection, setRowSelection] = useState({})

    useEffect(() => {
        setData(userData)
    }, [])

    const debouncedSetGlobalFilter = useCallback(
        debounce((value: any) => {
            setGlobalFilter(value)
        }, 500),
        [],
    )

    const columns = useMemo<MRT_ColumnDef<User>[]>(
        () => [
            {
                accessorKey: "name",
                header: "Name",
                Cell: ({ row }) => (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar src={row.original.avatar} alt={row.original.name} />
                        <Box>
                            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{row.original.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                @{row.original.username}
                            </Typography>
                        </Box>
                    </Box>
                ),
            },
            {
                accessorKey: "status",
                header: "Status",
                Cell: ({ cell }) => (
                    <Chip
                        label={cell.getValue<string>()}
                        color="primary"
                        size="small"
                        sx={{
                            backgroundColor: "#cce6ff",
                            color: "#0080ff",
                            borderRadius: "16px",
                            fontWeight: "medium",
                        }}
                    />
                ),
                filterVariant: "select",
                filterSelectOptions: ["Working", "On Leave", "Offline"],
                // muiTableBodyCellProps: { sx: { paddingRight: "8px" } },
            },
            {
                accessorKey: "role",
                header: "Role",
                filterVariant: "multi-select",
                filterSelectOptions: ["Product manager", "Designer", "Developer", "QA Engineer"],
                // muiTableBodyCellProps: { sx: { paddingLeft: "8px" } },
            },
            {
                accessorKey: "email",
                header: "Email",
            },
            {
                accessorKey: "teams",
                header: "Teams",
                Cell: ({ cell }) => {
                    const teams = cell.getValue<string[]>()
                    const displayTeams = teams.slice(0, 3)
                    const remainingCount = teams.length - displayTeams.length

                    return (
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
                            {displayTeams.map((team: any) => (
                                <Chip
                                    key={team}
                                    label={team}
                                    size="small"
                                    sx={{
                                        fontWeight: "medium",
                                        backgroundColor:
                                            team === "Design"
                                                ? "#cce6ff"
                                                : team === "Product"
                                                    ? "#99ccff"
                                                    : team === "Development"
                                                        ? "#66b3ff"
                                                        : "#66b3ff",
                                        color:
                                            team === "Design"
                                                ? "#0080ff"
                                                : team === "Product"
                                                    ? "#004d99"
                                                    : team === "Development"
                                                        ? "#003366"
                                                        : "#003366",
                                        borderRadius: "16px",
                                    }}
                                />
                            ))}
                            {remainingCount > 0 && (
                                <Chip
                                    label={`+${remainingCount}`}
                                    size="small"
                                    sx={{
                                        fontWeight: "medium",
                                        backgroundColor: "#f2f2f2",
                                        color: "#00000",
                                        borderRadius: "16px",
                                        alignItems: "center",
                                    }}
                                />
                            )}
                        </Box>
                    )
                },
            },
            {
                accessorKey: "age",
                header: "Age",
                enableColumnFilter: false,
            },
            {
                id: "actions",
                header: "",
                Cell: () => (
                    <Box sx={{ display: "flex", gap: 4, marginLeft: "50px" }}>
                        <Box
                            sx={{
                                width: 20,
                                height: 20,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "2px solid #000000",
                                cursor: "pointer",
                            }}
                        >
                            <></>
                        </Box>
                        <Box
                            sx={{
                                width: 20,
                                height: 20,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "2px solid #000000",
                                cursor: "pointer",
                            }}
                        >
                            <></>
                        </Box>
                    </Box>
                ),
                enableColumnFilter: false,
                enableSorting: false,
            },
        ],
        [],
    )

    const table = useMaterialReactTable({
        columns,
        data,
        enableRowSelection: true,
        // enableColumnFiltering: true,
        enableColumnFilters: true,
        enableGlobalFilter: true,
        enablePagination: true,
        manualFiltering: false,
        manualPagination: false,
        manualSorting: false,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: debouncedSetGlobalFilter,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        state: {
            columnFilters,
            globalFilter,
            pagination,
            sorting,
            rowSelection,
        },
        initialState: {
            density: "comfortable",
            columnVisibility: { age: false }, // hiding the age column.....  used for sorting only
        },
        muiPaginationProps: {
            color: "primary",
            shape: "rounded",
            showFirstButton: true,
            showLastButton: true,
        },
        paginationDisplayMode: "pages",
        positionPagination: "bottom",
        positionToolbarAlertBanner: "bottom",
        muiTableHeadCellProps: {
            sx: {
                fontWeight: "600",
            },
        },
        muiTableBodyRowProps: {
            sx: {
                "&:hover": {
                    backgroundColor: "#f5f5f5",
                },
            },
        },
        renderTopToolbarCustomActions: () => (
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                {/* we can add more custom toptions here */}
            </Box>
        ),
    })

    return <MaterialReactTable table={table} />
}
