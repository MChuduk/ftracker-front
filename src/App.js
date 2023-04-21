import {Routes, Route, Navigate} from "react-router-dom";
import {SignUpPage} from "./pages/SignUpPage";
import {SignInPage} from "./pages/SignInPage";
import {WalletsPage} from "./pages/WalletsPage";
import {DashboardPage} from "./pages/DashboardPage";
import {RequireAuth} from "./components/RequireAuth";
import {Layout} from "./components/Layout";
import {CreateWalletPage} from "./pages/WalletsPage/CreateWalletPage";
import {TransactionsPage} from "./pages/TransactionsPage";
import {CreateTransactionPage} from "./pages/TransactionsPage/CreateTransactionPage";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from "chart.js";
import {InfoWalletPage} from "./pages/WalletsPage/InfoWalletPage";
import {TransactionCategoriesPage} from "./pages/TransactionCategoriesPage";
import {CreateTransactionCategoryPage} from "./pages/TransactionCategoriesPage/CreateTransactionCategoryPage";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function App() {
  return (
      <>
        <Routes>
          <Route path="/signUp" element={<SignUpPage/>}/>
          <Route path="/signIn" element={<SignInPage/>}/>
          <Route
              path="/"
              element={
                <RequireAuth>
                  <Layout/>
                </RequireAuth>
              }
          >
            <Route index element={<Navigate to="dashboard" replace/>}/>
            <Route path="dashboard" element={<DashboardPage/>}/>
            <Route path="wallets" element={<WalletsPage/>}/>
            <Route path="wallets/new" element={<CreateWalletPage/>}/>
            <Route path="wallets/:walletId/settings" element={<InfoWalletPage/>} />
            <Route path="transactions" element={<TransactionsPage/>}/>
            <Route path="transactions/new" element={<CreateTransactionPage/>}/>
            <Route path="transaction_categories" element={<TransactionCategoriesPage/>} />
            <Route path="transaction_categories/new" element={<CreateTransactionCategoryPage/>} />
          </Route>
        </Routes>
      </>
  );
}

export default App;
