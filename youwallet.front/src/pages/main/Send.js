import { useEffect, useState } from "react";
import axiosClient from "../../axios";

export const Send = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const allUsers = async () => {
      try {
        const allUsers = await axiosClient.post("/users/list");
        setUsers(allUsers.data.user_list.data);
      } catch (error) {
        console.error(error);
      }
    };
    allUsers();
  }, []);
  return (
    <div
      className="h-screen flex flex-col gap-10 justify-center items-center p-28 w-full mx-auto"
      style={{ height: "80vh" }}
    >
      <div className="w-full px-5">
        <h1 className="text-2xl font-medium">Total Users:</h1>
      </div>
      <div className="relative w-full">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Controls
              </th>
            </tr>
          </thead>
          <tbody className="border">
            {users.map((user, index) => {
              <tr key={index} className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {user.name}
              </th>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
            </tr>
            })}
            {/* <tr className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};
