"use client";
import {JSX, useState} from "react";
import {useCurrentUser} from "@/firebase/auth";
import {auth} from "@/firebase/init";
import {useTimeout} from "usehooks-ts";

export default function AuthGuard(
    {
      loadingChildren,
      notLoggedInChildren,
      loggedInChildren,
      roles,
    }: {
      loadingChildren?: JSX.Element | JSX.Element[];
      notLoggedInChildren?: JSX.Element | JSX.Element[];
      loggedInChildren?: JSX.Element | JSX.Element[];
      roles?: string[];
    }
) {
  const [isLoading, setIsLoading] = useState(true);
  const {profile} = useCurrentUser(auth);
  useTimeout(
      () => {
        setIsLoading(false);
      },
      1000 * 5,
  );
  if (isLoading && !profile) {
    return loadingChildren;
  }
  if (!isLoading && !profile) {
    return notLoggedInChildren;
  }
  if (roles && roles.includes(profile!.role ?? "any")) {
    return <div>You are not authorized to view this page</div>;
  }
  return loggedInChildren;
}
