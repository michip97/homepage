export const Footer = () => {
  return (
    <footer className="bg-bgPrimary border-t border-borderBase py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-textSecondary text-sm">
          © {new Date().getFullYear()} Michael Portmann. All rights reserved.
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0 text-textSecondary text-sm">
          Built with React, Vite, Tailwind & .NET
        </div>
      </div>
    </footer>
  );
};
