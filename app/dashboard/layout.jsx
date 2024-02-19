import Dashboard from "./dashboard";

export default function Layout({ children }) {

  return (
    <Dashboard>
      {children}
    </Dashboard>
  );
}
