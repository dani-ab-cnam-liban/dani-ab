"use client";

type UserProps = {
  id?: string;
  displayName?: string | null;
  handle?: string | null;
  avatarUrl?: string | null;
};

type AvatarProps = {
  user?: UserProps | null;
  size?: number;
  className?: string;
};

export default function Avatar({ user, size = 40, className = "" }: AvatarProps) {
  const initial = (user?.displayName || user?.handle || "?").charAt(0).toUpperCase();

  return (
    <div
      className={`avatar ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {user?.avatarUrl ? (
        <img
          src={user.avatarUrl}
          alt={user.displayName || user.handle || "Avatar"}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        initial
      )}
    </div>
  );
}