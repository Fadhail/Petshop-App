import StatsCard from "../molecules/StatsCard";

const DashboardStats = ({ stats }) => {
  const statsData = [
    {
      title: "Total Hewan",
      value: stats.totalPets || 0,
      icon: "🐾",
      color: "blue"
    },
    {
      title: "Tersedia untuk Adopsi",
      value: stats.availablePets || 0,
      icon: "❤️",
      color: "green"
    },
    {
      title: "Menunggu Adopsi",
      value: stats.pendingPets || 0,
      icon: "⏳",
      color: "yellow"
    },
    {
      title: "Telah Diadopsi",
      value: stats.adoptedPets || 0,
      icon: "🏠",
      color: "purple"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default DashboardStats;
