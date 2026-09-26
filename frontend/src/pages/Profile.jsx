import { Card, Input } from "../components/UI";

function getCurrentUser() {
  try {
    const u = localStorage.getItem("user");
    if (u) return JSON.parse(u);
  } catch (e) {}
  return { full_name: "Sarah Connor (Admin)", email: "admin@stocksense.io", role: "admin" };
}

function formatRole(role) {
  if (role === "admin") return "Admin User";
  if (role === "inventory_manager") return "Inventory Manager";
  if (role === "warehouse_staff") return "Warehouse Staff";
  return role || "Inventory Specialist";
}

function getInitials(name) {
  if (!name) return "SC";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export default function Profile() {
  const currentUser = getCurrentUser();
  const initials = getInitials(currentUser.full_name);
  const roleTitle = formatRole(currentUser.role);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="mt-1 text-sm text-slate-500">Manage your account information and role details.</p>
      </div>

      <Card className="max-w-4xl p-6">
        <div className="grid gap-8 md:grid-cols-[180px_1fr]">
          <div className="text-center">
            <div className="mx-auto grid h-32 w-32 place-items-center rounded-full bg-blue-100 text-4xl font-bold text-blue-700 shadow-inner">
              {initials}
            </div>
            <button className="mt-4 rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition">
              Upload Photo
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Full Name" defaultValue={currentUser.full_name || "User Account"} />
            <Input label="Email Address" defaultValue={currentUser.email || "user@stocksense.io"} />
            <Input label="Phone Number" defaultValue="+1 (555) 234-5678" />
            <Input label="Designation / Role" defaultValue={roleTitle} disabled />

            <div className="sm:col-span-2 mt-2">
              <button className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition">
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
