
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  basics: z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(10, { message: "Please enter a valid phone number." }),
    location: z.string().min(2, { message: "Location is required." }),
    summary: z.string().min(50, { message: "Summary should be at least 50 characters." }).max(500, { message: "Summary should be less than 500 characters." }),
  }),
  work: z.array(
    z.object({
      company: z.string().min(2, { message: "Company name is required." }),
      position: z.string().min(2, { message: "Position is required." }),
      startDate: z.string().min(2, { message: "Start date is required." }),
      endDate: z.string().optional(),
      highlights: z.string().min(10, { message: "Please add some highlights of your work." }),
    })
  ).min(1, { message: "At least one work experience is required." }),
  skills: z.array(
    z.object({
      name: z.string().min(2, { message: "Skill name is required." }),
      level: z.string().optional(),
    })
  ).min(1, { message: "At least one skill is required." }),
  education: z.array(
    z.object({
      institution: z.string().min(2, { message: "Institution name is required." }),
      area: z.string().min(2, { message: "Area of study is required." }),
      studyType: z.string().min(2, { message: "Degree type is required." }),
      startDate: z.string().min(2, { message: "Start date is required." }),
      endDate: z.string().optional(),
    })
  ).min(1, { message: "At least one education entry is required." }),
});

type FormValues = z.infer<typeof formSchema>;

interface ResumeFormProps {
  onSubmit: (data: FormValues) => void;
}

const ResumeForm = ({ onSubmit }: ResumeFormProps) => {
  const [activeTab, setActiveTab] = useState("basics");
  
  const defaultValues: FormValues = {
    basics: {
      name: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
    },
    work: [
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        highlights: "",
      },
    ],
    skills: [
      {
        name: "",
        level: "Intermediate",
      },
    ],
    education: [
      {
        institution: "",
        area: "",
        studyType: "",
        startDate: "",
        endDate: "",
      },
    ],
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  const addWorkExperience = () => {
    const currentWork = form.getValues("work");
    form.setValue("work", [
      ...currentWork,
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        highlights: "",
      },
    ]);
  };

  const addSkill = () => {
    const currentSkills = form.getValues("skills");
    form.setValue("skills", [
      ...currentSkills,
      {
        name: "",
        level: "Intermediate",
      },
    ]);
  };

  const addEducation = () => {
    const currentEducation = form.getValues("education");
    form.setValue("education", [
      ...currentEducation,
      {
        institution: "",
        area: "",
        studyType: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const handleSubmit = (data: FormValues) => {
    try {
      onSubmit(data);
      toast({
        title: "Resume created",
        description: "Your resume has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  const nextTab = () => {
    if (activeTab === "basics") setActiveTab("work");
    else if (activeTab === "work") setActiveTab("education");
    else if (activeTab === "education") setActiveTab("skills");
  };

  const prevTab = () => {
    if (activeTab === "skills") setActiveTab("education");
    else if (activeTab === "education") setActiveTab("work");
    else if (activeTab === "work") setActiveTab("basics");
  };

  return (
    <div className="animate-fade-in">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basics">Basics</TabsTrigger>
              <TabsTrigger value="work">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basics" className="animate-fade-up">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="basics.name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="basics.email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="basics.phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="(123) 456-7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="basics.location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="City, State" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="basics.summary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Professional Summary</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="A brief summary of your professional background and goals..." 
                              className="h-32"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            This will appear at the top of your resume. Aim for 3-5 sentences.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-end mt-4">
                <Button type="button" onClick={nextTab}>Next</Button>
              </div>
            </TabsContent>

            <TabsContent value="work" className="animate-fade-up">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {form.watch("work").map((_, index) => (
                      <div key={index} className="p-4 border rounded-md space-y-4">
                        <FormField
                          control={form.control}
                          name={`work.${index}.company`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company</FormLabel>
                              <FormControl>
                                <Input placeholder="Company name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`work.${index}.position`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Position</FormLabel>
                              <FormControl>
                                <Input placeholder="Job title" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`work.${index}.startDate`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                  <Input placeholder="MM/YYYY" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`work.${index}.endDate`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                  <Input placeholder="MM/YYYY or Present" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name={`work.${index}.highlights`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Responsibilities & Achievements</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="• Implemented new system that increased efficiency by 20%
• Led team of 5 in project development" 
                                  className="h-32"
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Enter bullet points separated by new lines
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={addWorkExperience}
                    >
                      Add Another Experience
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-between mt-4">
                <Button type="button" variant="outline" onClick={prevTab}>Previous</Button>
                <Button type="button" onClick={nextTab}>Next</Button>
              </div>
            </TabsContent>

            <TabsContent value="education" className="animate-fade-up">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {form.watch("education").map((_, index) => (
                      <div key={index} className="p-4 border rounded-md space-y-4">
                        <FormField
                          control={form.control}
                          name={`education.${index}.institution`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Institution</FormLabel>
                              <FormControl>
                                <Input placeholder="University name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`education.${index}.studyType`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Degree</FormLabel>
                                <FormControl>
                                  <Input placeholder="Bachelor's, Master's, etc." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`education.${index}.area`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Field of Study</FormLabel>
                                <FormControl>
                                  <Input placeholder="Computer Science, Business, etc." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`education.${index}.startDate`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                  <Input placeholder="MM/YYYY" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`education.${index}.endDate`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                  <Input placeholder="MM/YYYY or Present" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={addEducation}
                    >
                      Add Another Education
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-between mt-4">
                <Button type="button" variant="outline" onClick={prevTab}>Previous</Button>
                <Button type="button" onClick={nextTab}>Next</Button>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="animate-fade-up">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {form.watch("skills").map((_, index) => (
                        <div key={index} className="p-4 border rounded-md space-y-4">
                          <FormField
                            control={form.control}
                            name={`skills.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Skill</FormLabel>
                                <FormControl>
                                  <Input placeholder="JavaScript, Project Management, etc." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`skills.${index}.level`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Proficiency Level (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="Beginner, Intermediate, Advanced" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={addSkill}
                    >
                      Add Another Skill
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-between mt-4">
                <Button type="button" variant="outline" onClick={prevTab}>Previous</Button>
                <Button type="submit">Create Resume</Button>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
};

export default ResumeForm;
