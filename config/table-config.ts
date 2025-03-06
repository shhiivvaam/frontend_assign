export const tableConfig = {    // we can directly change the configs here without touching the JSON table
    schema: {
        columns: [
            {
                id: "name",
                header: "Name",
                accessorKey: "name",
                enableSorting: true,
                enableFiltering: true,
            },
            {
                id: "status",
                header: "Status",
                accessorKey: "status",
                enableSorting: true,
                enableFiltering: true,
                filterType: "select",
                filterOptions: ["Working", "On Leave", "Offline"],
            },
            {
                id: "role",
                header: "Role",
                accessorKey: "role",
                enableSorting: true,
                enableFiltering: true,
                filterType: "multi-select",
                filterOptions: ["Product manager", "Designer", "Developer", "QA Engineer"],
            },
            {
                id: "email",
                header: "Email",
                accessorKey: "email",
                enableSorting: true,
                enableFiltering: false,
            },
            {
                id: "teams",
                header: "Teams",
                accessorKey: "teams",
                enableSorting: false,
                enableFiltering: false,
            },
            {
                id: "age",
                header: "Age",
                accessorKey: "age",
                enableSorting: true,
                enableFiltering: false,
                visible: false, // it will be hidden be default, but can be used for sortig
            },
            {
                id: "actions",
                header: "",
                enableSorting: false,
                enableFiltering: false,
            },
        ],
    },
    features: {
        pagination: true,
        rowSelection: true,
        filtering: true,
        sorting: true,
        globalFilter: true,
    },
    appearance: {
        density: "comfortable", // available options - compact / spacious
        showBorders: false,
        striped: false,
        highlightOnHover: true,
    },
}