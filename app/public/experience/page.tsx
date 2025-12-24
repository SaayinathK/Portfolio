import Experience from "@/backend/models/Experience";
import dbConnect  from "@/backend/lib/db";

const formatDate = (date?: Date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short" })
    : "";

export default function ExperiencePage() {
  return (
    <div id="top" className="space-y-6 max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold">Experience</h1>
      {/* ...content... */}
    </div>
  );
}