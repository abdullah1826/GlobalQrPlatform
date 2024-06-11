import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <GoogleOAuthProvider clientId="1080950918147-c0rkdk9sfe64s974d3obmt7hr6c76j23.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </>
);
