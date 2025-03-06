import TableComponent from "@/components/table-component";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div className="w-full max-w-7xl">
        <TableComponent />
      </div>
    </main>
  );
}
