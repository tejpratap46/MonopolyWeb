import AuthGuard from "@/app/components/layouts/auth_guard";
import UserProfile from "@/app/components/user_profile";
import Board from "@/app/components/board";

export default function AdminDashboardPage() {
    return (
        <AuthGuard loadingChildren={<div>Loading...</div>}
                   loggedInChildren={<>
                       <Board />
                   </>}
                   notLoggedInChildren={<p>Not logged in</p>}/>
    );
}
