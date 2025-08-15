import React, { useState } from "react";

const Dashboard = () => {
  const data = Array.from({ length: 2122 }, (_, i) => ({
    id: i + 1,
    username: `User${i + 1}`,
    password: `Pass${i + 1}`,
    source: `O2 UK`,
    createdDate: new Date().toISOString().split("T")[0], // Today's Date
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;
  const [copiedText, setCopiedText] = useState(null);

  const totalPages = Math.ceil(data.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);

    setTimeout(() => {
      setCopiedText(null);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Navbar */}
      <header className="flex justify-between items-center bg-white shadow p-4">
        <h1 className="text-xl font-bold">Company Name</h1>
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </header>

      {/* Table/Grid Content */}
      <main className="p-4 flex-grow overflow-auto">
        <h2 className="text-lg font-semibold mb-4">Data Table</h2>
        <table className="w-full border-collapse border border-gray-300 bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Sr#</th>
              <th className="border p-2">Username</th>
              <th className="border p-2">Password</th>
              <th className="border p-2">Source</th>
              <th className="border p-2">Created Date</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="border p-2">{item.id}</td>
                <td className="border text-center p-2 relative">
                  <span
                    className="text-blue-600 cursor-pointer relative group"
                    onClick={() => copyToClipboard(item.username)}
                  >
                    {item.username}
                    <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-6 text-xs bg-gray-800 text-white px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity min-w-[120px] text-center">
                      {copiedText === item.username
                        ? "Copied!"
                        : "Click here to copy"}
                    </span>
                  </span>
                </td>
                <td className="border text-center p-2 relative">
                  <span
                    className="text-blue-600 cursor-pointer relative group"
                    onClick={() => copyToClipboard(item.password)}
                  >
                    {item.password}
                    <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-6 text-xs bg-gray-800 text-white px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity min-w-[140px] text-center">
  {copiedText === item.password ? "Copied!" : "Click here to copy"}
</span>
                  </span>
                </td>
                <td className="border text-center p-2">{item.source}</td>
                <td className="border text-center    p-2">{item.createdDate}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
