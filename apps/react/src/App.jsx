import "./App.css";
import { Message } from "@common/common";

function App() {
  const message = new Message("react快速启动模板");
  message.print();
  return (
    <>
      <div></div>
      <h1>Vite + React</h1>
      <div>快速启动模板</div>
    </>
  );
}

export default App;
