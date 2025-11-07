import { Helmet } from "react-helmet-async";
import { Download, FileText } from "lucide-react";

export default function Reports() {
  const reports = [
    {
      id: "1",
      title: "Kingdom's AI Strategy 2024: Comprehensive Analysis",
      description: "Deep dive into Saudi Arabia's national AI strategy, including key initiatives, investment priorities, and implementation roadmap aligned with Vision 2030.",
      category: "Strategy Analysis",
      pages: 45,
      publishedDate: "November 2024",
      coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=600&fit=crop",
      downloadUrl: "#"
    },
    {
      id: "2",
      title: "SDAIA Annual Report: Progress & Milestones",
      description: "Comprehensive review of the Saudi Data & AI Authority's achievements, regulatory updates, and strategic initiatives driving digital transformation.",
      category: "Regulatory Update",
      pages: 62,
      publishedDate: "October 2024",
      coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=600&fit=crop",
      downloadUrl: "#"
    },
    {
      id: "3",
      title: "GCC AI Investment Landscape 2024",
      description: "Analysis of AI investment trends, startup ecosystems, and funding patterns across the Gulf Cooperation Council countries.",
      category: "Market Intelligence",
      pages: 38,
      publishedDate: "September 2024",
      coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=600&fit=crop",
      downloadUrl: "#"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Reports - The Aqool Wire</title>
        <meta
          name="description"
          content="Download comprehensive reports on AI strategy, regulation, and market intelligence for Saudi Arabia and the GCC region."
        />
      </Helmet>

      <main className="min-h-screen relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          {/* Hero Section */}
          <div className="mb-12">
            <span className="kicker mb-4">Research Reports</span>
            <h1 className="text-4xl lg:text-5xl font-black text-white mt-4 mb-4 leading-tight">
              In-Depth AI Intelligence Reports
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
              Download comprehensive reports featuring strategic analysis, regulatory updates, and market intelligence for Saudi Arabia's AI ecosystem.
            </p>
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reports.map((report) => (
              <div
                key={report.id}
                className="glass-card overflow-hidden group hover:scale-[1.02] transition-all duration-300"
                data-testid={`report-${report.id}`}
              >
                {/* Cover Image */}
                <div className="aspect-[2/3] overflow-hidden bg-gradient-to-br from-[#00d4aa]/20 to-[#ff00ff]/20 relative">
                  <img
                    src={report.coverImage}
                    alt={report.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1b] via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#ff00ff] text-white text-xs font-bold px-3 py-1 rounded-full magenta-glow">
                      NEW
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="eyebrow mb-3 block">{report.category}</span>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00d4aa] transition-colors">
                    {report.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {report.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {report.pages} pages
                    </span>
                    <span>•</span>
                    <span>{report.publishedDate}</span>
                  </div>

                  {/* Download Button */}
                  <a
                    href={report.downloadUrl}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-[#00d4aa] to-[#00a888] text-[#0a0f1b] font-bold rounded-lg hover:scale-105 transition-transform cyan-glow"
                    data-testid={`button-download-${report.id}`}
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 glass-card p-12 text-center border border-[#00d4aa]/30">
            <h2 className="text-3xl font-black text-white mb-4">
              Need Custom Research?
            </h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Our team can produce tailored research reports on AI trends, regulatory developments, and market opportunities specific to your needs.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-colors focus-cyan"
              data-testid="link-contact-reports"
            >
              Request Custom Report
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
