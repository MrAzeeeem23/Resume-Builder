"use client"
import { PDFDownloadLink } from "@react-pdf/renderer"
import ResumePDF from "./ResumePDF"
import { Button } from "@/components/ui/button"
import { Download, AlertCircle } from "lucide-react"

const ResumeDownload = ({ resumeData }) => {
  // Add validation
  if (!resumeData) {
    return (
      <div className="mt-6 p-4 text-center text-red-600 bg-red-50 rounded-lg border border-red-200">
        <AlertCircle className="h-5 w-5 mx-auto mb-2" />
        <p>No resume data available</p>
      </div>
    )
  }

  const fileName = `${resumeData?.contact?.fullName?.replace(/\s+/g, "_") || "Resume"}.pdf`

  return (
    <div className="mt-6 text-center">
      <PDFDownloadLink document={<ResumePDF resume={resumeData} />} fileName={fileName}>
        {({ blob, url, loading, error }) => {
          if (error) {
            return (
              <Button variant="destructive" disabled>
                <AlertCircle className="h-4 w-4 mr-2" />
                Error generating PDF
              </Button>
            )
          }

          return (
            <Button disabled={loading} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3">
              <Download className="h-4 w-4 mr-2" />
              {loading ? "Preparing PDF..." : "Download Resume PDF"}
            </Button>
          )
        }}
      </PDFDownloadLink>
    </div>
  )
}

export default ResumeDownload
