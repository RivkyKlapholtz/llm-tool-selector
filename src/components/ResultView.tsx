export const ResultView = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-4">
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-lg animate-pulse" />
          <div className="absolute inset-2 border-4 border-primary/40 rounded-lg animate-pulse delay-75" />
          <div className="absolute inset-4 border-4 border-primary rounded-lg animate-pulse delay-150" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">תצוגת קובייה</h1>
      </div>
    </div>
  );
};
