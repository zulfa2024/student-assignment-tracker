import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AssignmentDashboard from "./components/AssignmentDashboard";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Student Assignment Tracker</h1>
      <p className="mb-6 text-gray-700">Welcome, {session.user?.email}</p>

      <AssignmentDashboard />
    </div>
  );
}
