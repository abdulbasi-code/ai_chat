import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/3 flex justify-center">
            <Avatar className="h-48 w-48 border-4 border-primary/20">
              <AvatarImage src="/avatar-placeholder.jpg" alt="Your Name" />
              <AvatarFallback className="text-4xl">YN</AvatarFallback>
            </Avatar>
          </div>
          <div className="w-full md:w-2/3 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">About Me</h2>
            <p className="text-muted-foreground">
              I&apos;m a frontend developer with experience in building
              responsive, accessible, and performant web applications. I
              specialize in React, Next.js, TypeScript, and Tailwind CSS, with
              knowledge of backend development as well.
            </p>
            <p className="text-muted-foreground">
              My passion lies in creating intuitive user interfaces that provide
              exceptional user experiences. With attention to detail and a
              commitment to clean code, I strive to build applications that are
              both visually appealing and functionally robust.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium">Education</h3>
                  <p className="text-sm text-muted-foreground">
                    Computer Science, University Name
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium">Experience</h3>
                  <p className="text-sm text-muted-foreground">
                    5+ years in web development
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
