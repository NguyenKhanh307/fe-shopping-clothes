// import { useEffect, useState } from "react";
// import { getUsers, createUser, updateUser, deleteUser } from "../api/userApi";
// import UserModal from "../components/UserModal";

// export default function UsersPage() {
//   const [users, setUsers] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editUser, setEditUser] = useState(null); // null = thêm mới

//   const fetchUsers = async () => {
//     const res = await getUsers();
//     setUsers(res.data);
//   };

//   useEffect(() => { fetchUsers(); }, []);

//   const handleOpenCreate = () => {
//     setEditUser(null);
//     setModalOpen(true);
//   };

//   const handleOpenEdit = (user) => {
//     setEditUser(user);
//     setModalOpen(true);
//   };

//   const handleSubmit = async (name) => {
//     if (!name.trim()) return;
//     if (editUser) {
//       await updateUser(editUser.id, { name });
//     } else {
//       await createUser({ name });
//     }
//     setModalOpen(false);
//     fetchUsers();
//   };

//   const handleDelete = async (id) => {
//     await deleteUser(id);
//     fetchUsers();
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-10 px-4">

//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold">Danh sách Users</h1>
//         <button
//           onClick={handleOpenCreate}
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//         >
//           + Thêm mới
//         </button>
//       </div>

//       {/* Table */}
//       <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
//         <thead>
//           <tr className="bg-gray-100 text-left">
//             <th className="border px-4 py-3">ID</th>
//             <th className="border px-4 py-3">Tên</th>
//             <th className="border px-4 py-3 text-center">Hành động</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length === 0 ? (
//             <tr>
//               <td colSpan={3} className="text-center py-6 text-gray-400">
//                 Không có dữ liệu
//               </td>
//             </tr>
//           ) : (
//             users.map((user) => (
//               <tr key={user.id} className="hover:bg-gray-50">
//                 <td className="border px-4 py-3">{user.id}</td>
//                 <td className="border px-4 py-3">{user.name}</td>
//                 <td className="border px-4 py-3">
//                   <div className="flex gap-2 justify-center">
//                     <button
//                       onClick={() => handleOpenEdit(user)}
//                       className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
//                     >
//                       Sửa
//                     </button>
//                     <button
//                       onClick={() => handleDelete(user.id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     >
//                       Xóa
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       {/* Modal */}
//       <UserModal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         onSubmit={handleSubmit}
//         initialName={editUser?.name || ""}
//       />
//     </div>
//   );
// }