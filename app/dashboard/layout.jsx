import Dashboard from "@/components/Dashboard/Dashboard";
import RoleAccess from "./roleAccess";


export default function Layout({ children }) {

  return (    
      <RoleAccess>
        {children}
      </RoleAccess>
  );
}
