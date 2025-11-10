import { Helmet } from "react-helmet-async";

export default function AIInvestmentObservatory() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Helmet>
        <title>AI Investment Observatory - AQOOL Wire</title>
        <meta
          name="description"
          content="AI Investment Observatory - Coming Soon"
        />
      </Helmet>

      <div className="max-w-2xl mx-auto text-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            Hold up, you arrived early...
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground">
            Wait a minute...
          </p>
          <p className="text-xl md:text-2xl font-semibold" style={{ color: '#2bd4a7' }}>
            AI Observatory is coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}
