import AdminDashboard from "./adminDashboard";

export default function Layout({ children }) {
    return (
        <AdminDashboard>
            {children}
        </AdminDashboard>
        
    )
}