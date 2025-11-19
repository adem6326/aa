import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ClientPage from "./pages/ClientPage";
import ClientList from "./pages/ClientList";
import ClientForm from "./pages/ClientForm";
import ClientDetail from "./pages/ClientDetail";
import ClientEdit from "./pages/ClientEdit";
import InteractionList from "./pages/InteractionList";
import InteractionForm from "./pages/InteractionForm";
import InteractionDetail from "./pages/InteractionDetail";
import InteractionEdit from "./pages/InteractionEdit";
import InvoiceList from "./pages/InvoiceList";
import InvoiceForm from "./pages/InvoiceForm";
import InvoiceDetail from "./pages/InvoiceDetail";
import InvoiceEdit from "./pages/InvoiceEdit";
import OrderList from "./pages/OrderList";
import OrderForm from "./pages/OrderForm";
import OrderDetail from "./pages/OrderDetail";
import OrderEdit from "./pages/OrderEdit";
import ProductList from "./pages/ProductList";
import ProductForm from "./pages/ProductForm";
import ProductDetail from "./pages/ProductDetail";
import ProductEdit from "./pages/ProductEdit";
import TicketList from "./pages/TicketList";
import TicketForm from "./pages/TicketForm";
import TicketDetail from "./pages/TicketDetail";
import TicketEdit from "./pages/TicketEdit";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route path="/clientpage" element={<PrivateRoute><ClientPage /></PrivateRoute>} />
        <Route path="/clients" element={<PrivateRoute><ClientList /></PrivateRoute>} />
        <Route path="/clients/new" element={<PrivateRoute><ClientForm /></PrivateRoute>} />
        <Route path="/clients/:id" element={<PrivateRoute><ClientDetail /></PrivateRoute>} />
        <Route path="/clients/:id/edit" element={<PrivateRoute><ClientEdit /></PrivateRoute>} />

        <Route path="/interactions" element={<PrivateRoute><InteractionList /></PrivateRoute>} />
        <Route path="/interactions/new" element={<PrivateRoute><InteractionForm /></PrivateRoute>} />
        <Route path="/interactions/:id" element={<PrivateRoute><InteractionDetail /></PrivateRoute>} />
        <Route path="/interactions/:id/edit" element={<PrivateRoute><InteractionEdit /></PrivateRoute>} />

        <Route path="/invoices" element={<PrivateRoute><InvoiceList /></PrivateRoute>} />
        <Route path="/invoices/new" element={<PrivateRoute><InvoiceForm /></PrivateRoute>} />
        <Route path="/invoices/:id" element={<PrivateRoute><InvoiceDetail /></PrivateRoute>} />
        <Route path="/invoices/:id/edit" element={<PrivateRoute><InvoiceEdit /></PrivateRoute>} />

        <Route path="/orders" element={<PrivateRoute><OrderList /></PrivateRoute>} />
        <Route path="/orders/new" element={<PrivateRoute><OrderForm /></PrivateRoute>} />
        <Route path="/orders/:id" element={<PrivateRoute><OrderDetail /></PrivateRoute>} />
        <Route path="/orders/:id/edit" element={<PrivateRoute><OrderEdit /></PrivateRoute>} />

        <Route path="/products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
        <Route path="/products/new" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
        <Route path="/products/:id" element={<PrivateRoute><ProductDetail /></PrivateRoute>} />
        <Route path="/products/:id/edit" element={<PrivateRoute><ProductEdit /></PrivateRoute>} />

        <Route path="/tickets" element={<PrivateRoute><TicketList /></PrivateRoute>} />
        <Route path="/tickets/new" element={<PrivateRoute><TicketForm /></PrivateRoute>} />
        <Route path="/tickets/:id" element={<PrivateRoute><TicketDetail /></PrivateRoute>} />
        <Route path="/tickets/:id/edit" element={<PrivateRoute><TicketEdit /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
