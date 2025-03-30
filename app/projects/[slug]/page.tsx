import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function ProjectPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;

  const project = {
    slug: "raivocoo",
    title: "Raivocoo",
    description:
      "A platform that helps video editors build fast and responsive portfolios with pre-built sections, drag and drop functionality, and comprehensive SEO tools.",
    fullDescription:
      "Raivocoo is a comprehensive platform designed specifically for video editors to showcase their work effectively. The platform provides a drag-and-drop interface for building portfolios, with pre-built sections like testimonials that can be easily customized. Users can manage their SEO settings including favicons, OG images, titles, descriptions, and even get a custom subdomain (yourname.raivocoo.com). The platform includes authentication, email integration, third-party services, and implements performance optimizations with React hooks like memo and useRef. It also prioritizes SEO with sitemaps, favicon configuration, OG tags, and optimized loading states.",
    image: "/project-raivocoo.png",
    link: "https://github.com/yourusername/raivocoo",
    features: [
      "User authentication and email integration",
      "Custom subdomains (yourname.raivocoo.com)",
      "SEO optimization with meta tags and sitemaps",
      "Analytics dashboard showing viewer metrics and geographic data",
      "Drag and drop interface for portfolio customization",
      "Pre-built sections like testimonials",
      "Performance optimizations using React hooks",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Authentication",
      "SEO",
    ],
  };

  if (params.slug !== project.slug) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The project you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button asChild>
          <Link href="/#projects">Back to Projects</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-20">
      <Button asChild variant="outline" className="mb-8">
        <Link href="/#projects">← Back to Projects</Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative h-[300px] lg:h-[500px] w-full rounded-lg overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
          <p className="text-muted-foreground">{project.fullDescription}</p>

          <div>
            <h2 className="text-xl font-semibold mb-3">Key Features</h2>
            <ul className="list-disc pl-5 space-y-2">
              {project.features.map((feature, idx) => (
                <li key={idx} className="text-muted-foreground">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-primary/10 text-primary rounded-full px-3 py-1"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <Button asChild size="lg" className="mt-6">
            <Link href={project.link} target="_blank">
              View Project
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
