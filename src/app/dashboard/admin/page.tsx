import { getAllUsers } from "@/actions/admin";

export default async function AdminPage() {
  const result = await getAllUsers();

  if (result.error) {
    return <div className="p-10 text-red-500 font-bold">
      {result.error}
    </div>;
  }

  const users = result.success || [];

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Օգտատերերի կառավարում</h1>
      
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-left text-gray-500">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Անուն</th>
              <th className="px-6 py-3">Էլ. հասցե</th>
              <th className="px-6 py-3">Դերը</th>
              <th className="px-6 py-3">Ամսաթիվ</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${
                    user.role === 'ADMIN' ? 'bg-red-100 text-red-600' :
                    user.role === 'DOCTOR' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}