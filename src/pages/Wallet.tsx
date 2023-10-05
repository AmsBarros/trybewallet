import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

function Wallet() {
  return (
    <div
      className="flex flex-col items-center justify-start min-h-screen
        w-4/5"
    >
      <Header />
      <div
        className="bg-gray-100"
        style={ { width: '90%' } }
      >
        <WalletForm />
      </div>
      <div className="mt-4">
        <Table />
      </div>
    </div>
  );
}

export default Wallet;
