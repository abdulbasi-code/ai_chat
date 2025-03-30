import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type SkillCategory = {
  name: string;
  skills: string[];
};

const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Responsive Design",
      "Redux",
    ],
  },
  {
    name: "Backend",
    skills: [
      "Node.js",
      "Express",
      "REST API Design",
      "Database Design",
      "Authentication",
    ],
  },
  {
    name: "Tools",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Figma",
      "Chrome DevTools",
      "npm/yarn",
    ],
  },
  {
    name: "Other",
    skills: [
      "SEO Optimization",
      "Performance Optimization",
      "Responsive Design",
      "UI/UX Design Principles",
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-4">My Skills</h2>
          <p className="text-muted-foreground max-w-[700px]">
            I&apos;ve developed a diverse set of skills throughout my career,
            focusing primarily on frontend technologies while also gaining
            experience with backend development.
          </p>
        </div>

        <Tabs defaultValue="Frontend" className="max-w-3xl mx-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            {skillCategories.map((category) => (
              <TabsTrigger key={category.name} value={category.name}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {skillCategories.map((category) => (
            <TabsContent
              key={category.name}
              value={category.name}
              className="p-0"
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="bg-muted rounded-lg px-4 py-2 text-sm"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
