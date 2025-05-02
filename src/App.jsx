import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Toaster} from "react-hot-toast";

import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Menu from "./pages/Menu";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import PageNotFond from "./pages/PageNotFound";
import Acconut from "./pages/Account";
import Login from "./pages/Login";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayput from "./ui/AppLayput";
import Order from "./features/orders/Order";
import ProtectedRoute from "./ui/ProtectedRoute";
import {DarkModeProvider} from "./context/DarkModeContext";
import {Analytics} from "@vercel/analytics/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
        <Analytics />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayput />
                </ProtectedRoute>
              }>
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/Orders" element={<Orders />} />
              <Route path="/Orders/:orderId" element={<Order />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/account" element={<Acconut />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<PageNotFond />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={8}
          containerStyle={{margin: "8px"}}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
