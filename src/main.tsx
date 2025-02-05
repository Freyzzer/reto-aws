import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import App from "./App";
import "@aws-amplify/ui-react/styles.css";


Amplify.configure(awsExports);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
