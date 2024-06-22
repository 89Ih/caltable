import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";

import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import Tables from "./pages/Tables/Tables";
import Orders from "./pages/Orders/Orders";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<IsPrivate>
          <HomePage />
        </IsPrivate>
        }
        />
        <Route path="/Table/:id" element={<IsPrivate>
          <Tables />
        </IsPrivate>
        }
        />
        <Route path="/Order/:id" element={<IsPrivate>
         <Orders/>
        </IsPrivate>
        }
        />
        <Route path="/signup" element={<IsAnon>
          <SignupPage />
        </IsAnon>
        }
        />
        <Route path="/login" element={<IsAnon>
          <LoginPage />
        </IsAnon>
        }
        />
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </div>
  );
}

export default App;