import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate(); 

  const items = [
    { label: "Dashboard", icon: "pi pi-home", command: () => navigate("/") },
    { label: "To-Do", icon: "pi pi-list", command: () => navigate("/todo") },
    { label: "Category", icon: "pi pi-tags", command: () => navigate("/category") },
  ];

  return <Menubar model={items} />;
};

export default Navbar;