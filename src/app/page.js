"use client"
import { useState } from "react"
import ResumeForm from "@/components/UserResumeForm"
import ResumeDownload from "@/components/ResumeDownload"
import aiResponse from "@/lib/ai-service"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Sparkles, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Home() {
  const [resumeData, setResumeData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFormSubmit = async (formData) => {
    setIsLoading(true)
    setError(null)

    try {
      console.log("Submitting form data:", formData)
      const generatedResume = await aiResponse(formData)
      setResumeData(generatedResume)
    } catch (err) {
      console.error("Error generating resume:", err)
      setError(err.message || "Failed to generate resume. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
       <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="text-4xl font-bold text-gray-900">Resume Builder</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create a professional, ATS-friendly resume in minutes using AI. Just fill in your details and let our AI
            craft the perfect resume for you.
          </p>
        </div>

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
     
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Resume Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResumeForm onSubmit={handleFormSubmit} isLoading={isLoading} />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  AI Generated Resume
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">AI is crafting your resume.</p>
                  </div>
                ) : resumeData ? (
                  <div>
                    <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-green-800 text-sm">
                        Resume generated successfully! Your professional resume is ready for download.
                      </p>
                    </div>
                    <ResumeDownload resumeData={resumeData} />

                 
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">Preview:</h3>
                      <div className="text-sm space-y-2">
                        <p>
                          <strong>Name:</strong> {resumeData?.contact?.fullName}
                        </p>
                        {resumeData?.summary && (
                          <p>
                            <strong>Summary:</strong> {resumeData.summary.substring(0, 100)}...
                          </p>
                        )}
                        {resumeData?.skills?.languages?.length > 0 && (
                          <p>
                            <strong>Skills:</strong> {resumeData.skills.languages.slice(0, 3).join(", ")}...
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Fill out the form to generate your AI-powered resume</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Sparkles className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">AI-Powered</h3>
              <p className="text-sm text-gray-600">
                Advanced AI analyzes your information and creates professional content
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">ATS-Friendly</h3>
              <p className="text-sm text-gray-600">Optimized format that passes through Applicant Tracking Systems</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-sm">✓</span>
              </div>
              <h3 className="font-semibold mb-2">Instant Download</h3>
              <p className="text-sm text-gray-600">Get your professional PDF resume ready in seconds</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
