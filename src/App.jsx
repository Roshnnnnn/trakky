import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Loader from "./Loader";

function App() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const baseUrl = import.meta.env.DEV
          ? "/api"
          : "https://20.193.149.47:2242";

        const response = await axios.get(
          `${baseUrl}/salons/service/?page=${currentPage}`
        );
        console.log(response.data.results);
        setServices(response.data.results); // Adjust based on actual API response structure
        setNextPageUrl(response.data.next);
        setPrevPageUrl(response.data.previous);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [currentPage]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const itemsPerPage = 10; // Set the number of items per page to 100

  const filteredServices = (services || []).filter((service) =>
    service.salon_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <Loader />
        </div>
      )}
      <input
        type="text"
        placeholder="Search services..."
        value={searchTerm}
        onChange={handleSearch}
        className="border rounded p-2 mb-4 w-full md:w-1/2 lg:w-1/3"
      />
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Salon Name</th>
            <th className="border border-gray-300 p-2 text-left">
              Description
            </th>
            <th className="border border-gray-300 p-2 text-left">
              Service Name
            </th>
            <th className="border border-gray-300 p-2 text-left">Price</th>
            <th className="border border-gray-300 p-2 text-left">
              Service Image
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? ( // Show loading state
            <tr>
              <td colSpan="5" className="text-center">
                Loading...
              </td>
            </tr>
          ) : error ? ( // Show error message
            <tr>
              <td colSpan="5" className="text-red-500 text-center">
                Error: {error}
              </td>
            </tr>
          ) : paginatedServices.length === 0 ? ( // Show no data message
            <tr>
              <td colSpan="5" className="text-center">
                No Data Available
              </td>
            </tr>
          ) : (
            paginatedServices.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2 text-sm md:text-base">
                  {service.salon_name}
                </td>
                <td
                  className="border border-gray-300 p-2 text-sm md:text-base"
                  dangerouslySetInnerHTML={{ __html: service.description }}
                ></td>
                <td className="border border-gray-300 p-2 text-sm md:text-base">
                  {service.service_name}
                </td>
                <td className="border border-gray-300 p-2 text-sm md:text-base">
                  {service.price}
                </td>
                <td className="border border-gray-300 p-2">
                  <img
                    src={service.service_image}
                    alt={service.service_name}
                    className="w-16 h-16 object-cover"
                    onError={(e) => {
                      e.target.src = "fallback-image-url.webp";
                    }}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="flex justify-between mt-4 flex-col md:flex-row">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={!prevPageUrl}
          className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-300 mb-2 md:mb-0 w-full md:w-auto"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={!nextPageUrl}
          className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-300 w-full md:w-auto"
        >
          Next
        </button>
      </div>
    </>
  );
}

export default App;
