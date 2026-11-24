import { redirect } from "next/navigation";
import NavBar from "@/components/NavBar";
import HomeFeed from "@/components/Home";
 
export default async function HomePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
 
  return (
    <div className="flex max-w-[1280px] mx-auto min-h-screen">
      <NavBar user={user} />
      <main className="flex-1 max-w-[600px] border-x border-gray-200 min-h-screen">
        <HomeFeed user={user} />
      </main>
      <aside className="hidden lg:block w-[350px] px-5 py-3">
        <div className="bg-gray-50 rounded-2xl p-4">
          <h3 className="text-lg font-extrabold mb-2">Welcome to your MVP</h3>
          <p className="text-gray-500 text-sm">
            This column is reserved for trends and who-to-follow suggestions in
            a future iteration.
          </p>
        </div>
      </aside>
    </div>
  );
}