export default function Table({ children }) {
  return (
    <table className="min-w-full border-collapse border border-gray-300">
      {children}
    </table>
  );
}