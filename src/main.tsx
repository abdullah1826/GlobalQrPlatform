import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <GoogleOAuthProvider clientId="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">
      <App />
    </GoogleOAuthProvider>
  </>
);
