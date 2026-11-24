"use client";

import { useEffect, useState } from "react";
import PostComposer from "./PostComposer";
import PostCard from "./PostCard";



  return (
    <div className="max-w-2xl border-x border-gray-100 min-h-screen">
      <PostComposer user={user} onPosted={handlePosted} />
      
      <div className="border-t border-gray-100">
        {loading ? (
          <p className="p-4 text-center text-gray-500">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="p-4 text-center text-gray-500">No posts yet. Write something above!</p>
        ) : (
          posts.map((post) => (
            <PostCard key={post.id} post={post} currentUser={user} />
          ))
        )}
      </div>
    </div>
  );
}