import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/formikForm";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1>Form Handling in React</h1>
      <div className="forms-wrapper">
        <RegistrationForm />
        <FormikForm />
      </div>
    </div>
  );
}

export default App;