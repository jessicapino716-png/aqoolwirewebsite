import ToolHighlight from '../ToolHighlight';
const toolImage = '/assets/generated_images/AI_tools_showcase_image_6a7339f5.png';

const sampleTool = {
  id: "tool-1",
  name: "Claude AI Assistant",
  description: "Advanced AI assistant for policy analysis, document review, and regulatory research. Specifically trained on Saudi AI governance frameworks and GCC policy documents.",
  category: "AI Assistant",
  rating: 4,
  features: ["Policy Analysis", "Document Review", "Multi-language Support", "Regulatory Research", "Content Generation"],
  pros: [
    "Excellent understanding of Saudi AI policy context",
    "Multi-language support (Arabic/English)",
    "Real-time policy updates and analysis",
    "Integration with government databases"
  ],
  cons: [
    "Requires subscription for advanced features",
    "Limited customization options",
    "May need training on specific use cases"
  ],
  pricing: "Freemium",
  website: "https://claude.ai",
  imageUrl: toolImage
};

const compactTool = {
  id: "tool-2",
  name: "PolicyBot Pro",
  description: "Automated policy monitoring and compliance checking tool for AI regulations.",
  category: "Compliance",
  rating: 5,
  features: ["Compliance Check", "Policy Monitoring"],
  pros: ["Automated tracking", "Real-time alerts"],
  cons: ["Premium pricing", "Learning curve"],
  pricing: "Premium",
  website: "https://policybot.ai",
  imageUrl: toolImage
};

export default function ToolHighlightExample() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Featured Tool</h3>
        <div className="max-w-md">
          <ToolHighlight tool={sampleTool} variant="featured" />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Compact Tool</h3>
        <div className="max-w-lg">
          <ToolHighlight tool={compactTool} variant="compact" />
        </div>
      </div>
    </div>
  );
}