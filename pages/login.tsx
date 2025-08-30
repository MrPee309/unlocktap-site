import Navbar from '../../components/Navbar';
import AuthForm from '../../components/AuthForm';

export default function LoginPage() {
  return (
    <main className="container">
      <Navbar />
      <div style={{height:16}} />
      <AuthForm mode="login" after="/" />
    </main>
  );
}
