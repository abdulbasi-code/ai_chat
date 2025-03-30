import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    title: "Raivocoo",
    slug: "raivocoo", // Added slug for URL path
    description:
      "A platform that helps video editors build fast and responsive portfolios with pre-built sections, drag and drop functionality, and comprehensive SEO tools.",
    image: "/project-raivocoo.png",
    githubLink: "https://github.com/yourusername/raivocoo",
    features: [
      "User authentication and email integration",
      "Custom subdomains (yourname.raivocoo.com)",
      "SEO optimization with meta tags and sitemaps",
      "Analytics dashboard showing viewer metrics",
      "Drag and drop interface for portfolio customization",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  // Add more projects as needed
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            My Projects
          </h2>
          <p className="text-muted-foreground max-w-[700px]">
            Here are some of the projects I&apos;ve worked on. Each one
            represents different challenges and solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative h-[200px] w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-medium">Key Features:</h4>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="text-muted-foreground">
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-primary/10 text-primary text-xs rounded-full px-2 py-1"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button asChild className="w-full">
                  <Link href={`/projects/${project.slug}`}>
                    Project Details
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href={project.githubLink} target="_blank">
                    GitHub
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
