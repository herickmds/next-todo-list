import '../styles/globals.css';
import '../styles/FormularioTarefaModal.css';
import Layout from '../components/Layout';
import { UserProvider } from '../contexts/userContext';
import App from 'next/app';

function MeuAplicativo({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

MeuAplicativo.getServerSideProps = async (appContext) => { 
  const appProps = await App.getServerSideProps(appContext);
  return { ...appProps };
};

export default MeuAplicativo;
