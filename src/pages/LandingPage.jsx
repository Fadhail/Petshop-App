import { Link } from "react-router-dom";
import Button from "../components/atoms/Button";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🐾 PetAdopt
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Temukan teman berbulu baru untuk keluarga Anda
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/dashboard">
              <Button variant="primary" size="large">
                Mulai Adopsi
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="outline" size="large">
                Admin Panel
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-4xl mb-4">❤️</div>
            <h3 className="text-lg font-semibold mb-2">Cari Hewan</h3>
            <p className="text-gray-600">
              Jelajahi berbagai hewan yang siap untuk diadopsi
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-lg font-semibold mb-2">Proses Adopsi</h3>
            <p className="text-gray-600">
              Isi formulir dan tunggu persetujuan dari tim kami
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="text-lg font-semibold mb-2">Rumah Baru</h3>
            <p className="text-gray-600">
              Berikan rumah penuh kasih untuk hewan peliharaan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
