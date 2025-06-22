    "use client"
    import { useState } from "react"
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
    import { Button } from "@/components/ui/button"
    import { Input } from "@/components/ui/input"
    import { Textarea } from "@/components/ui/textarea"
    import { Label } from "@/components/ui/label"
    import { Plus, Trash2, User, Briefcase, Code, Award, FileText } from "lucide-react"

    const ResumeForm = ({ onSubmit, isLoading }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        linkedin: "",
        github: "",
        collegeName: "",
        course: "",
        courseDuration: "",
        cgpa: "",
        experience: [],
        projects: [],
        skills: {
        languages: [],
        tools: [],
        technologies: [],
        },
        achievements: "",
        jobDescription: "",
    })

    const [currentExperience, setCurrentExperience] = useState({
        role: "",
        company: "",
        duration: "",
        location: "",
        responsibilities: "",
    })

    const [currentProject, setCurrentProject] = useState({
        title: "",
        description: "",
        technologies: "",
        link: "",
    })

    const [currentSkill, setCurrentSkill] = useState("")
    const [skillCategory, setSkillCategory] = useState("languages")

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const addExperience = () => {
        if (currentExperience.role && currentExperience.company) {
        const responsibilities = currentExperience.responsibilities
            .split("\n")
            .filter((resp) => resp.trim())
            .map((resp) => resp.trim())

        setFormData((prev) => ({
            ...prev,
            experience: [...prev.experience, { ...currentExperience, responsibilities }],
        }))
        setCurrentExperience({ role: "", company: "", duration: "", location: "", responsibilities: "" })
        }
    }

    const removeExperience = (index) => {
        setFormData((prev) => ({
        ...prev,
        experience: prev.experience.filter((_, i) => i !== index),
        }))
    }

    const addProject = () => {
        if (currentProject.title && currentProject.description) {
        const description = currentProject.description
            .split("\n")
            .filter((desc) => desc.trim())
            .map((desc) => desc.trim())

        setFormData((prev) => ({
            ...prev,
            projects: [...prev.projects, { ...currentProject, description }],
        }))
        setCurrentProject({ title: "", description: "", technologies: "", link: "" })
        }
    }

    const removeProject = (index) => {
        setFormData((prev) => ({
        ...prev,
        projects: prev.projects.filter((_, i) => i !== index),
        }))
    }

    const addSkill = () => {
        if (currentSkill.trim()) {
        setFormData((prev) => ({
            ...prev,
            skills: {
            ...prev.skills,
            [skillCategory]: [...prev.skills[skillCategory], currentSkill.trim()],
            },
        }))
        setCurrentSkill("")
        }
    }

    const removeSkill = (category, index) => {
        setFormData((prev) => ({
        ...prev,
        skills: {
            ...prev.skills,
            [category]: prev.skills[category].filter((_, i) => i !== index),
        },
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.fullName || !formData.collegeName || !formData.course) {
        alert("Please fill all required fields (Name, College, Course)")
        return
        }
        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Personal Information */}
        <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
            </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                />
                </div>
                <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                />
                </div>
                <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                />
                </div>
                <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/johndoe"
                />
                </div>
                <div className="md:col-span-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                    id="github"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="https://github.com/johndoe"
                />
                </div>
            </div>
            </CardContent>
        </Card>

        {/* Education */}
        <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Education
            </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                <Label htmlFor="collegeName">College/University *</Label>
                <Input
                    id="collegeName"
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleChange}
                    required
                    placeholder="University of Technology"
                />
                </div>
                <div>
                <Label htmlFor="course">Course/Degree *</Label>
                <Input
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                    placeholder="Bachelor of Computer Science"
                />
                </div>
                <div>
                <Label htmlFor="courseDuration">Duration</Label>
                <Input
                    id="courseDuration"
                    name="courseDuration"
                    value={formData.courseDuration}
                    onChange={handleChange}
                    placeholder="2021 - 2024"
                />
                </div>
                <div>
                <Label htmlFor="cgpa">CGPA/GPA</Label>
                <Input id="cgpa" name="cgpa" value={formData.cgpa} onChange={handleChange} placeholder="3.8/4.0" />
                </div>
            </div>
            </CardContent>
        </Card>

        {/* Skills */}
        <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Skills
            </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            <div className="flex gap-2">
                <select
                value={skillCategory}
                onChange={(e) => setSkillCategory(e.target.value)}
                className="px-3 py-2 border rounded-md"
                >
                <option value="languages">Programming Languages</option>
                <option value="tools">Tools/Platforms</option>
                <option value="technologies">Technologies/Frameworks</option>
                </select>
                <Input
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                placeholder="Add a skill"
                className="flex-1"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                />
                <Button type="button" onClick={addSkill}>
                <Plus className="h-4 w-4" />
                </Button>
            </div>

            {Object.entries(formData.skills).map(
                ([category, skills]) =>
                skills.length > 0 && (
                    <div key={category}>
                    <Label className="capitalize">{category.replace(/([A-Z])/g, " $1")}</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {skills.map((skill, index) => (
                        <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                        >
                            {skill}
                            <button
                            type="button"
                            onClick={() => removeSkill(category, index)}
                            className="text-blue-600 hover:text-blue-800"
                            >
                            <Trash2 className="h-3 w-3" />
                            </button>
                        </span>
                        ))}
                    </div>
                    </div>
                ),
            )}
            </CardContent>
        </Card>

        {/* Experience */}
        <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Work Experience
            </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                <Label>Job Title</Label>
                <Input
                    value={currentExperience.role}
                    onChange={(e) => setCurrentExperience({ ...currentExperience, role: e.target.value })}
                    placeholder="Software Developer"
                />
                </div>
                <div>
                <Label>Company</Label>
                <Input
                    value={currentExperience.company}
                    onChange={(e) => setCurrentExperience({ ...currentExperience, company: e.target.value })}
                    placeholder="Tech Corp"
                />
                </div>
                <div>
                <Label>Duration</Label>
                <Input
                    value={currentExperience.duration}
                    onChange={(e) => setCurrentExperience({ ...currentExperience, duration: e.target.value })}
                    placeholder="Jan 2023 - Present"
                />
                </div>
                <div>
                <Label>Location</Label>
                <Input
                    value={currentExperience.location}
                    onChange={(e) => setCurrentExperience({ ...currentExperience, location: e.target.value })}
                    placeholder="San Francisco, CA"
                />
                </div>
            </div>
            <div>
                <Label>Responsibilities (one per line)</Label>
                <Textarea
                value={currentExperience.responsibilities}
                onChange={(e) => setCurrentExperience({ ...currentExperience, responsibilities: e.target.value })}
                placeholder="Developed web applications using React and Node.js&#10;Collaborated with cross-functional teams&#10;Improved application performance by 30%"
                rows={4}
                />
            </div>
            <Button type="button" onClick={addExperience} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
            </Button>

            {formData.experience.map((exp, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex justify-between items-start">
                    <div>
                    <h4 className="font-semibold">
                        {exp.role} at {exp.company}
                    </h4>
                    <p className="text-sm text-gray-600">
                        {exp.duration} • {exp.location}
                    </p>
                    <ul className="text-sm mt-2 list-disc list-inside">
                        {exp.responsibilities.map((resp, i) => (
                        <li key={i}>{resp}</li>
                        ))}
                    </ul>
                    </div>
                    <Button type="button" variant="outline" size="sm" onClick={() => removeExperience(index)}>
                    <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
                </div>
            ))}
            </CardContent>
        </Card>

        {/* Projects */}
        <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Projects
            </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                <Label>Project Title</Label>
                <Input
                    value={currentProject.title}
                    onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                    placeholder="E-commerce Website"
                />
                </div>
                <div>
                <Label>Technologies Used</Label>
                <Input
                    value={currentProject.technologies}
                    onChange={(e) => setCurrentProject({ ...currentProject, technologies: e.target.value })}
                    placeholder="React, Node.js, MongoDB"
                />
                </div>
                <div className="md:col-span-2">
                <Label>Project Link</Label>
                <Input
                    value={currentProject.link}
                    onChange={(e) => setCurrentProject({ ...currentProject, link: e.target.value })}
                    placeholder="https://github.com/username/project"
                />
                </div>
            </div>
            <div>
                <Label>Description (one feature per line)</Label>
                <Textarea
                value={currentProject.description}
                onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                placeholder="Built a full-stack e-commerce platform&#10;Implemented user authentication and payment processing&#10;Deployed using Docker and AWS"
                rows={4}
                />
            </div>
            <Button type="button" onClick={addProject} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Project
            </Button>

            {formData.projects.map((proj, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex justify-between items-start">
                    <div>
                    <h4 className="font-semibold">{proj.title}</h4>
                    <p className="text-sm text-gray-600">{proj.technologies}</p>
                    {proj.link && (
                        <a href={proj.link} className="text-sm text-blue-600 hover:underline">
                        {proj.link}
                        </a>
                    )}
                    <ul className="text-sm mt-2 list-disc list-inside">
                        {proj.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                        ))}
                    </ul>
                    </div>
                    <Button type="button" variant="outline" size="sm" onClick={() => removeProject(index)}>
                    <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
                </div>
            ))}
            </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievements
            </CardTitle>
            </CardHeader>
            <CardContent>
            <Label htmlFor="achievements">Achievements (one per line)</Label>
            <Textarea
                id="achievements"
                name="achievements"
                value={formData.achievements}
                onChange={handleChange}
                placeholder="Won first place in university hackathon&#10;Published research paper on machine learning&#10;Led a team of 5 developers"
                rows={4}
            />
            </CardContent>
        </Card>

        {/* Job Description */}
        <Card>
            <CardHeader>
            <CardTitle>Job Description (Optional)</CardTitle>
            </CardHeader>
            <CardContent>
            <Label htmlFor="jobDescription">Paste the job description to tailor your resume</Label>
            <Textarea
                id="jobDescription"
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                placeholder="Paste the job description here to help AI tailor your resume..."
                rows={6}
            />
            </CardContent>
        </Card>

        <Button type="submit" className="w-full py-3 text-lg" disabled={isLoading}>
            {isLoading ? "Generating Resume..." : "Generate Resume with AI"}
        </Button>
        </form>
    )
    }

    export default ResumeForm
