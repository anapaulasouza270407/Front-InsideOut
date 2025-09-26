// Componente responsável por emitir notificações utilizando a biblioteca react-hot-tost
 
// Importação do arquivo authProvider responsável pela autenticação dos usuários e controle de rotas privadas
 
// Importação do appRoutes componente de gerenciamento de rotas
import { AuthProvider } from "./context/AuthContext";
import { AppRoutes } from "./routes/AppRoutes";
 
// construção código principal
function App(){
  return(
    <AuthProvider>
      <AppRoutes/>
    </AuthProvider>
    
  )
}
 
export default App;