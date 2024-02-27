import Dashboard from "@/components/Dashboard/Dashboard";


export default function Layout({ children }) {

  return (
    <Dashboard>
      {children}
    </Dashboard>
  );
}
