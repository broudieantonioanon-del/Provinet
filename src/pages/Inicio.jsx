import LoginHeader from "../components/LoginHeader";
import LoginForm from "../components/LoginForm";

export default function Inicio() {
  return (
    <div className="min-h-screen bg-white font-main flex flex-col">
      <LoginHeader />
      <main className="flex-1 flex flex-col items-center pt-8 md:pt-12">
        

        
        <LoginForm />
      </main>
    </div>);

}