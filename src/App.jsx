import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CategoriesProvider } from "./context/CategoriesContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CategoriesProvider>
          <AppRoutes />
        </CategoriesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;