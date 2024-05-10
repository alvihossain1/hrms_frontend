import AdminDashboard from "./adminDashboard";
import RoleAccess from "./roleAccess";

export default function Layout({ children }) {
    return (
        <RoleAccess>
            {children}
        </RoleAccess>
    )
}