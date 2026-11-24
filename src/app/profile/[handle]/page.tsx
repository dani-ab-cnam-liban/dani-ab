import ProfileView from "@/components/ProfileView";

interface ProfilePageProps {
  params: Promise<{ handle: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { handle } = await params;
  const currentUser = await getCurrentUser();

  return (
    <main className="min-h-screen bg-white">
      <ProfileView handle={handle} currentUser={currentUser} />
    </main>
  );
}