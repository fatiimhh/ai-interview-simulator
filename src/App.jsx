import Header from "./components/Header";
import RoleSelector from "./components/RoleSelector";
import StartInterviewButton from "./components/StartInterviewButton";
import ChatBox from "./components/ChatBox";
import InputBar from "./components/InputBar";

function App() {
  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-xl w-full px-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <Header />
          <RoleSelector />
          <StartInterviewButton />
          <ChatBox />
          <InputBar />
        </div>
      </div>
    </div>
  );
}

export default App;
