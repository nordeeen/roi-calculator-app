export const FeatureIcon = ({ icon }: { icon: string }) => {
  const isSvgPath = icon.startsWith('/');

  return (
    <div className={`w-12 h-12 flex items-center justify-center`}>
      {isSvgPath ? <img src={icon} className="w-8 h-8" /> : <span>{icon}</span>}
    </div>
  );
};
