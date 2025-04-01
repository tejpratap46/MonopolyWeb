"use client";
import {useCachedCurrentUser} from "@/firebase/auth";
import { auth } from "@/firebase/init";

export default function UserProfile() {
  const { user } = useCachedCurrentUser(auth);
  return (
    <div>
      <p>Is the user cached: </p> {user?.email ?? "[NULL]"}
    </div>
  );
}
