import { useEffect, useState } from "react";
import type { User } from "./api/types";
import { LoginForm } from "./components/LoginForm";
import { checkUser } from "./api";
import { ProductsPage } from "./components/ProductsPage";
import { Spinner } from "./components/Spinner";

function App() {
  const [user, setUser] = useState<User | null | false>(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    checkUser().then((response) => {
      if (response?.ok) {
        response.json().then((result) => {
          setUser(result);
          setPending(false);
        });
      } else {
        setPending(false);
      }
    });
  }, []);

  if (pending) return <Spinner />;

  if (user) return <ProductsPage />;

  return <LoginForm onAuth={setUser} />;
}

export default App;
