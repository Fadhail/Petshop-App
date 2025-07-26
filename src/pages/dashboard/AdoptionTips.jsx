// import { useState, useEffect } from "react";
// import Card from "../../components/atoms/Card";
// import Button from "../../components/atoms/Button";
// import Input from "../../components/atoms/Input";

// const AdoptionTips = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [tips, setTips] = useState([]);

//   useEffect(() => {
//     const mockTips = [
//       {
//         id: 1,
//         title: "Persiapan Sebelum Adopsi",
//         category: "preparation",
//         content: "Pastikan Anda sudah mempersiapkan segala kebutuhan hewan peliharaan seperti tempat makan, tempat tidur, mainan, dan peralatan grooming.",
//         image: "/api/placeholder/300/200"
//       },
//       {
//         id: 2,
//         title: "Memilih Hewan yang Tepat",
//         category: "selection",
//         content: "Pilih hewan yang sesuai dengan gaya hidup, ukuran rumah, dan kemampuan Anda dalam merawat. Pertimbangkan energi, ukuran, dan kebutuhan khusus hewan.",
//         image: "/api/placeholder/300/200"
//       },
//       {
//         id: 3,
//         title: "Hari-hari Pertama di Rumah",
//         category: "care",
//         content: "Berikan waktu untuk hewan beradaptasi dengan lingkungan baru. Jangan langsung memaksa interaksi, biarkan mereka menjelajahi rumah secara bertahap.",
//         image: "/api/placeholder/300/200"
//       },
//       {
//         id: 4,
//         title: "Perawatan Kesehatan Rutin",
//         category: "health",
//         content: "Jadwalkan pemeriksaan kesehatan rutin, vaksinasi, dan perawatan gigi. Simpan catatan kesehatan hewan untuk referensi dokter hewan.",
//         image: "/api/placeholder/300/200"
//       },
//       {
//         id: 5,
//         title: "Nutrisi yang Tepat",
//         category: "nutrition",
//         content: "Berikan makanan berkualitas sesuai usia dan kebutuhan hewan. Konsultasikan dengan dokter hewan mengenai jenis dan jumlah makanan yang tepat.",
//         image: "/api/placeholder/300/200"
//       },
//       {
//         id: 6,
//         title: "Latihan dan Sosialisasi",
//         category: "training",
//         content: "Latih hewan dengan sabar dan konsisten. Sosialisasikan dengan manusia dan hewan lain secara bertahap untuk mengembangkan kepercayaan diri.",
//         image: "/api/placeholder/300/200"
//       },
//       {
//         id: 7,
//         title: "Membangun Rutinitas",
//         category: "care",
//         content: "Buat jadwal rutin untuk makan, bermain, dan istirahat. Hewan menyukai rutinitas yang konsisten dan dapat diprediksi.",
//         image: "/api/placeholder/300/200"
//       },
//       {
//         id: 8,
//         title: "Mengatasi Masalah Perilaku",
//         category: "training",
//         content: "Identifikasi penyebab masalah perilaku dan atasi dengan pendekatan positif. Jangan ragu untuk berkonsultasi dengan ahli perilaku hewan.",
//         image: "/api/placeholder/300/200"
//       }
//     ];

//     setTips(mockTips);
//   }, []);

//   const categories = [
//     { value: "", label: "Semua Kategori" },
//     { value: "preparation", label: "Persiapan" },
//     { value: "selection", label: "Pemilihan" },
//     { value: "care", label: "Perawatan" },
//     { value: "health", label: "Kesehatan" },
//     { value: "nutrition", label: "Nutrisi" },
//     { value: "training", label: "Pelatihan" }
//   ];

//   const filteredTips = tips.filter(tip => {
//     const matchesSearch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          tip.content.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === "" || tip.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const getCategoryName = (category) => {
//     const categoryObj = categories.find(cat => cat.value === category);
//     return categoryObj ? categoryObj.label : category;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Tips Adopsi Hewan
//           </h1>
//           <p className="text-gray-600">
//             Panduan lengkap untuk mempersiapkan dan merawat hewan peliharaan adopsi
//           </p>
//         </div>

//         {/* Search and Filter */}
//         <div className="bg-white p-4 rounded-lg shadow-md mb-6">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="md:col-span-2">
//               <Input
//                 placeholder="Cari tips..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <div>
//               <select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               >
//                 {categories.map(category => (
//                   <option key={category.value} value={category.value}>
//                     {category.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Tips Grid */}
//         {filteredTips.length === 0 ? (
//           <div className="text-center py-12">
//             <div className="text-gray-400 text-6xl mb-4">💡</div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               Tidak ada tips yang ditemukan
//             </h3>
//             <p className="text-gray-500">
//               Coba ubah kata kunci pencarian atau kategori
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredTips.map(tip => (
//               <Card key={tip.id} className="overflow-hidden">
//                 <img
//                   src={tip.image}
//                   alt={tip.title}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-6">
//                   <div className="flex justify-between items-start mb-3">
//                     <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
//                       {getCategoryName(tip.category)}
//                     </span>
//                   </div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-3">
//                     {tip.title}
//                   </h3>
//                   <p className="text-gray-600 text-sm leading-relaxed mb-4">
//                     {tip.content}
//                   </p>
//                   <Button variant="outline" size="small" className="w-full">
//                     Baca Selengkapnya
//                   </Button>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         )}

//         {/* Additional Resources */}
//         <div className="mt-12">
//           <Card className="p-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">
//               Butuh Bantuan Lebih Lanjut?
//             </h2>
//             <p className="text-gray-600 mb-4">
//               Tim ahli kami siap membantu Anda dalam proses adopsi dan perawatan hewan peliharaan.
//             </p>
//             <div className="flex flex-wrap gap-3">
//               <Button variant="primary">
//                 Hubungi Konsultan
//               </Button>
//               <Button variant="outline">
//                 FAQ Adopsi
//               </Button>
//               <Button variant="outline">
//                 Komunitas Adopsi
//               </Button>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdoptionTips;
